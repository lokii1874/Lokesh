/* =========================================================================
   Spendly — a mini expense tracker (starter)
   Fill in every TODO. Your code must compile with `npm run build`
   (tsc, strict mode) with ZERO type errors. Do NOT use `any` to dodge types.
   See TODO.md for the task list and marks.
   ========================================================================= */

/* -------------------------------------------------------------------------
   TASK 1 — Enum (LU: Enums & Tuples)
   TODO: Define a string enum `Category` with: Food, Travel, Bills, Other.
   ------------------------------------------------------------------------- */
// enum Category { ... }

/* -------------------------------------------------------------------------
   TASK 2 — Model type (LU: TypeTasks Model & Types)
   TODO: Define an `Expense` interface/type with:
         id: number, title: string, amount: number, category: Category
   ------------------------------------------------------------------------- */
// interface Expense { ... }

/* -------------------------------------------------------------------------
   TASK 3 — Utility types (LU: Utility Types)
   TODO: Using the utility types, declare:
         - NewExpense = Omit<Expense, "id">        // what the form produces
         - Breakdown  = Record<Category, number>    // per-category totals
         - (one more) Partial<Expense> OR Pick<...> used somewhere sensible
   ------------------------------------------------------------------------- */
// type NewExpense = ...
// type Breakdown  = ...

/* -------------------------------------------------------------------------
   TASK 4 — Tuple (LU: Enums & Tuples)
   TODO: Define a tuple type `SummaryRow` = [Category, number]
         (used to return each breakdown row).
   ------------------------------------------------------------------------- */
// type SummaryRow = ...

/* In-memory store (already typed once you define Expense above). */
// const expenses: Expense[] = [];
let nextId = 1;

/* -------------------------------------------------------------------------
   TASK 5 — Type guard / narrowing (LU: Type Guards & Narrowing)
   TODO: Write `toNewExpense` that takes the RAW form strings and either
         returns a valid `NewExpense` or `null`.
         Use typeof / Number checks and verify the category is a real enum
         value. Reject: empty title, non-positive or non-numeric amount,
         invalid category. No `any`.
   ------------------------------------------------------------------------- */
// function toNewExpense(title: string, amountRaw: string, category: string): NewExpense | null { ... }

/* -------------------------------------------------------------------------
   TASK 6 — Core logic
   TODO: total()      -> sum of all expense amounts (number)
         breakdown()  -> SummaryRow[] : one [category, total] row per Category
   ------------------------------------------------------------------------- */
// function total(): number { ... }
// function breakdown(): SummaryRow[] { ... }

/* -------------------------------------------------------------------------
   TASK 7 — DOM wiring + render (LU: TypeTasks UI, Build & Ship)
   TODO:
     - Grab the form + inputs with getElementById and cast to the right
       HTMLElement types (e.g. `as HTMLInputElement`).
     - On submit: preventDefault, call toNewExpense, show an error message
       if invalid, else push a full Expense (add the id) and re-render.
     - render(): paint the #list, #total, and #breakdown from the data.
   ------------------------------------------------------------------------- */
// const form = document.getElementById("expense-form") as HTMLFormElement;
// ... wire up the submit handler and render() here ...

/* Call render() once on load so the UI reflects the (empty) state. */
// render();

/*========================================================================
  Spendly — a mini expense tracker (starter)
========================================================================== */
/* -------------------------------------------------------------------------
   TASK 1 — Enum (LU: Enums & Tuples)
   ------------------------------------------------------------------------ */
   enum Category {
       Food = "Food",
         Travel = "Travel",
         Bills = "Bills",
         Other = "Other"
   }

/* -------------------------------------------------------------------------
   TASK 2 — Model type (LU: TypeTasks Model & Types)
   ------------------------------------------------------------------------ */
   interface Expense {
       id: number;
       title: string;
       amount: number;
       category: Category;
   }

/* -------------------------------------------------------------------------
   TASK 3 — Utility types (LU: Utility Types)
   ------------------------------------------------------------------------ */
   type NewExpense = Omit<Expense, "id">;
   type Breakdown = Record<Category, number>;

/* -------------------------------------------------------------------------
   TASK 4 — Tuple (LU: Enums & Tuples)
   ------------------------------------------------------------------------ */
   type SummaryRow = [Category, number];

/* In-memory store (already typed once you define Expense above). */
const expenses: Expense[] = [];
let nextId = 1;

/* -------------------------------------------------------------------------
   TASK 5 — Type guard / narrowing (LU: Type Guards & Narrowing)
   ------------------------------------------------------------------------ */
function toNewExpense(title: string, amountRaw: string, category: string): NewExpense | null {
    const amount = Number(amountRaw);
    if (!title || isNaN(amount) || amount <= 0 || !Object.values(Category).includes(category as Category)) {
        return null;
    }
    return { title, amount, category: category as Category };
}

/* -------------------------------------------------------------------------
   TASK 6 — Core logic
   ------------------------------------------------------------------------ */
function total(): number {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
}

function breakdown(): SummaryRow[] {
    const breakdownMap: Breakdown = {
        [Category.Food]: 0,
        [Category.Travel]: 0,
        [Category.Bills]: 0,
        [Category.Other]: 0
    };

    for (const expense of expenses) {
        breakdownMap[expense.category] += expense.amount;
    }

    return Object.entries(breakdownMap) as SummaryRow[];
}

/* -------------------------------------------------------------------------
   TASK 7 — DOM wiring + render (LU: TypeTasks UI, Build & Ship)
   ------------------------------------------------------------------------ */
const form = document.getElementById("expense-form") as HTMLFormElement;
const titleInput = document.getElementById("title") as HTMLInputElement;
const amountInput = document.getElementById("amount") as HTMLInputElement;
const categoryInput = document.getElementById("category") as HTMLSelectElement;
const listContainer = document.getElementById("list") as HTMLElement;
const totalContainer = document.getElementById("total") as HTMLElement;
const breakdownContainer = document.getElementById("breakdown") as HTMLElement;

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const newExpense = toNewExpense(titleInput.value, amountInput.value, categoryInput.value);
    if (newExpense) {
        expenses.push({ ...newExpense, id: nextId++ });
        render();
        form.reset();
    } else {
        alert("Invalid input. Please check your entries.");
    }
});

function render(): void {
   listEl.innerHTML = "";
   if (expenses.length === 0) {
      const emptyli = document.createElement("li");
      emptyli.textContent = "No expenses yet.";
      listEl.appendChild(emptyli);
   }else {
      for (const expense of expenses) {
         const li = document.createElement("li");
         li.textContent = `${expense.title} - $${expense.amount} (${expense.category})`;
         listEl.appendChild(li);
      }
   }
   totalEl.textContent = `Total: $${total().toExponential(2)}`;

   breakdownEl.innerHTML = "";
   const breakdownData = breakdown();
   for (const [category, amount] of breakdownData) {
      const li = document.createElement("li");
      li.textContent = `${category}: $${amount.toExponential(2)}`;
      breakdownEl.appendChild(li);
   }  
   form.addEventListener("submit", (event) => {
      event.preventDefault();
      const newExpense = toNewExpense(titleInput.value, amountInput.value, categoryInput.value);
      if (newExpense) {
          expenses.push({ ...newExpense, id: nextId++ });
          render();
          form.reset();
      } else {
          alert("Invalid input. Please check your entries.");
      }
  }); 
  if (!candidate) {
   errorEl.textContent = 
     "please enter a valid title, a positive amount, and a valid category.";     
     return;
  }
  errorEl.textContent = "";  
  expenses.push({ 
   ...candidate, 
   id: 
   nextId++,
 });   
 form.reset();
  render();
};

    // Render list
    listContainer.innerHTML = expenses.map(expense => `<li>${expense.title} - $${expense.amount} (${expense.category})</li>`).join("");

    // Render total
    totalContainer.textContent = `Total: $${total()}`;    
    