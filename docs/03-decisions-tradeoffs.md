# Decisions & Tradeoffs

## 1. One folder per location

**Decision:** Give each Gym Master a single upload destination.

**Why:** More complex folder trees created unnecessary cognitive load and increased the chance the process would not be followed consistently.

**Tradeoff:** The central operator has more sorting work later, but adoption is easier for frontline staff.

---

## 2. Automate compliance tracking

**Decision:** Use Apps Script to check each folder daily and update a tracker.

**Why:** Manual checking does not scale and creates repetitive administrative work.

**Tradeoff:** The first implementation checks file creation dates. A future version may need stronger event-based tracking if files are moved from existing Drive locations rather than newly uploaded.

---

## 3. Keep the owner view-only

**Decision:** Give the owner visibility into the main media folder without edit access.

**Why:** The owner can monitor activity while reducing accidental file movement or deletion.

---

## 4. Keep automation private

**Decision:** Do not share the Apps Script project with Gym Masters or the owner unless operationally necessary.

**Why:** They need the output of the automation, not the implementation details.

---

## 5. Public portfolio is sanitized

**Decision:** Publish architecture, reasoning, and reusable code patterns instead of internal business identifiers or customer media.

**Why:** The portfolio should prove technical and product thinking without exposing private business information.
