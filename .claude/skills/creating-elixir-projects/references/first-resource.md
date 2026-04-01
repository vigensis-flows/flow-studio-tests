# Creating Your First Resource

Complete example of creating an Ash resource from scratch.

## Example: Blog Post Resource

### 1. Generate Domain and Resource

```bash
mix ash.gen.domain MyApp.Blog
mix ash.gen.resource MyApp.Blog.Post --extend postgres
```

### 2. Define the Resource

Edit `lib/my_app/blog/post.ex`:

```elixir
defmodule MyApp.Blog.Post do
  use Ash.Resource,
    otp_app: :my_app,
    domain: MyApp.Blog,
    extensions: [AshPostgres.Resource]

  postgres do
    table "posts"
    repo MyApp.Repo
  end

  attributes do
    uuid_primary_key :id

    attribute :title, :string do
      allow_nil? false
      constraints max_length: 255
    end

    attribute :body, :string do
      allow_nil? false
    end

    attribute :published_at, :utc_datetime

    create_timestamp :inserted_at
    update_timestamp :updated_at
  end

  relationships do
    belongs_to :author, MyApp.Accounts.User do
      allow_nil? false
    end
  end

  actions do
    defaults [:read, :destroy]

    create :create do
      primary? true
      accept [:title, :body]

      change relate_actor(:author)
    end

    update :update do
      primary? true
      accept [:title, :body]
    end

    update :publish do
      accept []
      change set_attribute(:published_at, &DateTime.utc_now/0)
    end
  end

  calculations do
    calculate :word_count, :integer, expr(
      fragment("array_length(regexp_split_to_array(?, '\\s+'), 1)", body)
    )
  end

  policies do
    # Anyone can read published posts
    policy action_type(:read) do
      authorize_if expr(not is_nil(published_at))
    end

    # Authors can read their own unpublished posts
    policy action_type(:read) do
      authorize_if relates_to_actor_via(:author)
    end

    # Only authors can update their posts
    policy action_type(:update) do
      authorize_if relates_to_actor_via(:author)
    end

    # Only authors can delete their posts
    policy action_type(:destroy) do
      authorize_if relates_to_actor_via(:author)
    end

    # Any authenticated user can create
    policy action_type(:create) do
      authorize_if actor_present()
    end
  end
end
```

### 3. Update the Domain

Edit `lib/my_app/blog/blog.ex`:

```elixir
defmodule MyApp.Blog do
  use Ash.Domain,
    otp_app: :my_app

  resources do
    resource MyApp.Blog.Post
  end
end
```

### 4. Generate and Run Migrations

```bash
mix ash_postgres.generate_migrations --name add_posts
mix ash_postgres.migrate
```

### 5. Create Domain Functions (Optional)

Add convenience functions to the domain:

```elixir
defmodule MyApp.Blog do
  use Ash.Domain,
    otp_app: :my_app

  resources do
    resource MyApp.Blog.Post
  end

  # Convenience functions
  def list_posts(opts \\ []) do
    Post
    |> Ash.Query.for_read(:read)
    |> Ash.read(opts)
  end

  def get_post!(id, opts \\ []) do
    Post
    |> Ash.get!(id, opts)
  end

  def create_post(attrs, opts \\ []) do
    Post
    |> Ash.Changeset.for_create(:create, attrs, opts)
    |> Ash.create()
  end

  def create_post!(attrs, opts \\ []) do
    Post
    |> Ash.Changeset.for_create(:create, attrs, opts)
    |> Ash.create!()
  end

  def update_post(post, attrs, opts \\ []) do
    post
    |> Ash.Changeset.for_update(:update, attrs, opts)
    |> Ash.update()
  end

  def publish_post(post, opts \\ []) do
    post
    |> Ash.Changeset.for_update(:publish, %{}, opts)
    |> Ash.update()
  end

  def delete_post(post, opts \\ []) do
    post
    |> Ash.Changeset.for_destroy(:destroy, opts)
    |> Ash.destroy()
  end

  # Authorization checks
  def can_update_post?(actor, post, attrs \\ %{}) do
    post
    |> Ash.can?({:update, attrs}, actor: actor)
  end
end
```

---

## Common Patterns

### Soft Deletes

```elixir
attributes do
  attribute :deleted_at, :utc_datetime
end

actions do
  update :soft_delete do
    accept []
    change set_attribute(:deleted_at, &DateTime.utc_now/0)
  end
end

# Filter out soft-deleted by default
preparations do
  prepare build(filter: expr(is_nil(deleted_at)))
end
```

### Slug Generation

```elixir
attributes do
  attribute :slug, :string do
    allow_nil? false
  end
end

changes do
  change fn changeset, _ ->
    case Ash.Changeset.get_attribute(changeset, :title) do
      nil -> changeset
      title ->
        slug = title |> String.downcase() |> String.replace(~r/[^a-z0-9]+/, "-")
        Ash.Changeset.change_attribute(changeset, :slug, slug)
    end
  end
end
```

### Timestamps with Timezone

```elixir
attributes do
  create_timestamp :inserted_at
  update_timestamp :updated_at
end
```

### Status Enum

```elixir
attributes do
  attribute :status, :atom do
    constraints one_of: [:draft, :published, :archived]
    default :draft
  end
end

actions do
  update :publish do
    accept []
    validate attribute_equals(:status, :draft)
    change set_attribute(:status, :published)
  end
end
```

---

## Testing the Resource

```elixir
defmodule MyApp.BlogTest do
  use MyApp.DataCase

  alias MyApp.Blog
  alias MyApp.Blog.Post

  describe "create_post/2" do
    test "creates post with valid data" do
      user = create_user!()

      assert {:ok, post} = Blog.create_post(
        %{title: "Hello", body: "World"},
        actor: user
      )

      assert post.title == "Hello"
      assert post.author_id == user.id
      assert is_nil(post.published_at)
    end
  end

  describe "publish_post/2" do
    test "sets published_at" do
      user = create_user!()
      post = create_post!(actor: user)

      assert is_nil(post.published_at)

      {:ok, published} = Blog.publish_post(post, actor: user)

      refute is_nil(published.published_at)
    end
  end

  describe "authorization" do
    test "author can update own post" do
      user = create_user!()
      post = create_post!(actor: user)

      assert Blog.can_update_post?(user, post)
    end

    test "other user cannot update post" do
      user1 = create_user!()
      user2 = create_user!()
      post = create_post!(actor: user1)

      refute Blog.can_update_post?(user2, post)
    end
  end
end
```
