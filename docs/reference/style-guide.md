# **Style Guide**

This is our internal guide to ensure our documentation is consistent, clear, and sounds like it came from a single, helpful source. This is a living document; please suggest improvements.

## **1\. Voice & Tone**

Voice is our personality (what we always sound like).  
Tone is our mood (which changes based on the situation).

* **Our Voice is:** Helpful, confident, and direct. We are experts, but we are not academic. We are friendly, but not overly casual or "chatty." We want our users to feel smart. 

* **Our Tone:**  
  * **In a tutorial:** We are encouraging and guiding.  
  * **In an error message:** We are direct and helpful (we explain *what* to do next).  
  * **In a technical reference:** We are precise and economical.  

* **Practical Rules for Voice & Tone:**  
  * **DO:** Use common contractions like "it's," "you're," and "don't." It sounds more natural and less robotic.  
  * **DON'T:** Use slang (e.g., "chill," "no worries") or emojis.  
  * **DON'T:** Use exclamation points.  
  * **DON'T:** Use "fluffy" introductory phrases.  
    * **Avoid:** "It is important to note that..."  
    * **Avoid:** "In this article, we will discuss..."  
    * **Avoid:** "As you may know,..."

## **2\. Core Principles (Achieving Clarity)**

These are our rules for making content clear, concise, and accurate.

### **Use the Active Voice**

This is our most important rule. Active voice is direct, uses fewer words, and clarifies who is doing the action.

* **Bad (Passive):** The button should be clicked to open the dialog.  
* **Good (Active):** Click the button to open the dialog.  
* **Bad (Passive):** A new project is created by the system.  
* **Good (Active):** The system creates a new project.

### **Keep Sentences Simple and Direct**

Write for a global audience. Avoid complex, multi-clause sentences. If a sentence has "and," "but," or "so," it can probably be split into two.

* **Bad:** The "Sync" feature, which is located in the main settings panel, will initiate a connection to the cloud in order to back up your data, but it won't run if you are in "Offline" mode.  

* **Good:** The "Sync" feature is in the main settings panel. It connects to the cloud to back up your data. "Sync" does not run in "Offline" mode.

### **Be Concise: Cut Filler Words**

Every word must do a job. If a word doesn't add meaning, cut it.

* **Bad:** In order to use the feature, you must first...  
* **Good:** To use the feature...  
* **Bad:** It is important to note that the system will time out.  
* **Good:** The system will time out.  
* **Bad:** This feature gives you the ability to...  
* **Good:** This feature lets you...

### **Be Task-Oriented**

Start with the verb. Tell the user what to do. This is especially true for headings and procedural steps.

* **Bad (Heading):** The "Project" Menu  
* **Good (Heading):** How to Create a New Project  
* **Bad (Heading):** Notes on Deletion  
* **Good (Heading):** Delete Your Account

### **Avoid Repetition (DRY / Single-Sourcing)**

Follow the "Don't Repeat Yourself" (DRY) principle. Don't repeat the same information in multiple places. If you find yourself copying and pasting a set of steps or a definition, that information should be its own self-contained "topic" (a separate article or section).  

**Prefer links over duplication.** This makes the document shorter and, more importantly, easier to maintain. When the information changes, you only have to update it in **one** place.

* **Bad:** The "Getting Started" guide and the "Troubleshooting" guide both contain the full 5-step process for installing the app. When the process changes, one is updated but the other is forgotten.  

* **Good:** Create one document called *How to Install the App*. The "Getting Started" guide and the "Troubleshooting" guide **both link** to it.  

* **Bad:** A tutorial that says "To get started, you must first do X, Y, and Z. ... \[long tutorial\] ... P.S. Remember, the setup steps are X, Y, and Z."  

* **Good:** A tutorial that says "Before you begin, make sure you have completed the *Setup Guide*. ... \[long tutorial\] ..."

### **Lead with the Answer (Inverted Pyramid)**

Get to the point immediately. Put the most important information, the "answer," or the primary action in the very first sentence or paragraph. Do not use long, "wind-up" introductions. Assume the user is busy and needs the answer now.

* **Bad:** In this guide, we will explore the various settings available in the "Profile" menu. We will cover how to update your name, change your password, and set your preferences. Finally, we will discuss how to delete your account.  

* **Good:** You can manage your account in the **Profile** menu. This is where you can update your name, change your password, set preferences, or delete your account.

## **3\. Formatting**

Consistency in formatting makes your document scannable and easy to read.

* **UI Elements:** Use **bold** for any clickable or interactive element (buttons, menu items, links).  
  * **Example:** Click **Save**, then go to the **File** menu. 

* **Code:** Use backticks for any code snippets, class names, function names, or file paths.
  * **Example:** Use the `run_script()` function. The file is located at `C:\Program Files\`.  
  
* **Filenames:** Use *italics* for general references to files or document names.  
  * **Example:** See our *Getting Started Guide* for details. 

* **Steps:** Always use numbered lists for sequential steps.  
  * **Example:**  
    1. Open the **Settings** menu.  
    2. Click **Profile**.  
    3. Enter your new password.  
* **Options:** Use bulleted lists for non-sequential options or items.
  * **Example:** The "Export" menu supports the following formats:
    * PDF
    * CSV
    * JSON

### **File Naming Conventions**

All documentation files should use lowercase with hyphens (kebab-case). This ensures consistency across the repository and avoids issues with case-sensitive file systems.

* **Documentation files (.md):** Use lowercase with hyphens separating words.
  * **Good:** `getting-started.md`, `api-reference.md`, `product-development-strategy.md`
  * **Bad:** `Getting-Started.md`, `API_Reference.md`, `ProductDevelopmentStrategy.md`

* **Directory names:** Use lowercase with hyphens.
  * **Good:** `internal/architecture/`, `product-management/`
  * **Bad:** `Internal/Architecture/`, `Product_Management/`

* **Exceptions:**
  * `README.md` files use uppercase (industry standard)
  * Code files follow their language conventions (e.g., `main.go`, `UserService.java`, `component.tsx`)

## **4\. Internal Terminology**

This is our internal "dictionary" to ensure we all use the same words for the same things.

* **Log in / login:**  
  * "Log in" (verb): "You must **log in** to the app."  
  * "login" ( noun/adjective): "Click the **login** button." or "Enter your **login** credentials."  

* **Users / Clients / Customers:**  
  * We call the people who use our product **"users"** in all documentation.  

* **Product Name:**
  * See [product/glossary.md](product/glossary.md) for official product name and capitalization.

* **Feature Names:**
  * See [product/glossary.md](product/glossary.md) for feature names and terminology.

## **5. Application to AI Persona Responses**

When AI personas respond:

1. **Follow the style guide** for all explanatory text, analysis, recommendations, and documentation
2. **Code is exempt** from the style guide (follow language conventions)
3. **Code comments** should follow the style guide (clear, concise, active voice)
4. **Balance persona voice with style guide**: Your persona has a specific perspective and mindset, but the *writing style* should be consistent across all personas

**Example** - Engineering Lead responding about technical debt:

❌ **Bad** (violates style guide):
```
It's important to note that, in this particular situation, we should probably
consider the fact that technical debt is something that needs to be managed!!!
As you may know, the codebase is going to become difficult to maintain if we
don't address this soon. 😊
```

✅ **Good** (follows style guide + persona):
```
Technical debt will slow our ability to ship and test new hypotheses. We should
prioritize the debt that's blocking validated learning. I recommend we dedicate
20% of each sprint to paying down debt in the authentication module. This
unblocks the social login experiment the PM wants to test.
```