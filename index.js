// ==========================================================================
// CGPA Calculator - Application Logic
// ==========================================================================

const AddBtn = document.getElementById("addBtn");
const RmvBtn = document.getElementById("rmvBtn");
const AllCoursesContainer = document.getElementById("AllCourses");
const ResultDiv = document.getElementById("Result");
const CoursesCountBadge = document.getElementById("coursesCountBadge");

let CourseCount = 1;

/**
 * Generates the HTML template for a course card
 * @param {number} index - Course number
 */
function createCourseCardHTML(index) {
    return `
        <div class="course-header-row">
            <span class="course-badge"><i class="fas fa-bookmark"></i> Course ${index}</span>
        </div>
        <div class="course-inputs-row">
            <div class="input-group course-name-group">
                <label for="course${index}">Course Name</label>
                <div class="input-wrapper">
                    <i class="fas fa-book input-icon"></i>
                    <input type="text" id="course${index}" placeholder="e.g. Course Title (optional)">
                </div>
            </div>
            <div class="input-group course-credit-group">
                <label for="credit${index}">Credit Hours <span class="required-star">*</span></label>
                <div class="input-wrapper">
                    <i class="fas fa-clock input-icon"></i>
                    <input type="number" id="credit${index}" step="0.25" min="0.5" max="10" placeholder="e.g. 3.0" class="course-credit" required>
                </div>
            </div>
            <div class="input-group course-grade-group">
                <label for="grade${index}">Letter Grade</label>
                <div class="input-wrapper">
                    <i class="fas fa-award input-icon"></i>
                    <select id="grade${index}" class="course-grade-select" onchange="syncGradeToPoint(this, ${index})">
                        <option value="">Select</option>
                        <option value="4.00">A+ (4.00)</option>
                        <option value="3.75">A (3.75)</option>
                        <option value="3.50">B+ (3.50)</option>
                        <option value="3.25">B (3.25)</option>
                        <option value="3.00">C+ (3.00)</option>
                        <option value="2.75">C (2.75)</option>
                        <option value="2.50">D+ (2.50)</option>
                        <option value="2.25">D (2.25)</option>
                        <option value="0.00">F (0.00)</option>
                    </select>
                </div>
            </div>
            <div class="input-group course-point-group">
                <label for="cgpa${index}">Grade Point <span class="required-star">*</span></label>
                <div class="input-wrapper">
                    <i class="fas fa-star input-icon"></i>
                    <input type="number" id="cgpa${index}" step="0.01" min="0" max="4.00" placeholder="e.g. 3.75" class="course-cgpa" oninput="syncPointToGrade(this, ${index})" required>
                </div>
            </div>
        </div>
    `;
}

/**
 * Syncs the selected Letter Grade to the numeric Grade Point input
 */
function syncGradeToPoint(selectElem, index) {
    const pointInput = document.getElementById(`cgpa${index}`);
    if (pointInput && selectElem.value !== "") {
        pointInput.value = selectElem.value;
    }
}

/**
 * Syncs typed numeric Grade Point back to the Letter Grade dropdown if it matches
 */
function syncPointToGrade(inputElem, index) {
    const gradeSelect = document.getElementById(`grade${index}`);
    if (gradeSelect) {
        const val = Number(inputElem.value).toFixed(2);
        let matched = false;
        for (let i = 0; i < gradeSelect.options.length; i++) {
            if (gradeSelect.options[i].value === val) {
                gradeSelect.selectedIndex = i;
                matched = true;
                break;
            }
        }
        if (!matched) {
            gradeSelect.value = "";
        }
    }
}

/**
 * Toggles the Full Grading Scale Modal dialog
 */
function toggleScaleModal() {
    const modal = document.getElementById("scaleModal");
    if (modal) {
        const isOpen = modal.classList.contains("show");
        if (isOpen) {
            modal.classList.remove("show");
            modal.setAttribute("aria-hidden", "true");
        } else {
            modal.classList.add("show");
            modal.setAttribute("aria-hidden", "false");
        }
    }
}

/**
 * Closes modal when user clicks outside the modal card
 */
function handleModalBackdropClick(event) {
    if (event.target.id === "scaleModal") {
        toggleScaleModal();
    }
}

// Close modal on Escape key press
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        const modal = document.getElementById("scaleModal");
        if (modal && modal.classList.contains("show")) {
            toggleScaleModal();
        }
    }
});

/**
 * Updates the course counter badge display
 */
function updateCourseCountBadge() {
    if (CoursesCountBadge) {
        CoursesCountBadge.textContent = `${CourseCount} ${CourseCount === 1 ? 'Course' : 'Courses'}`;
    }
}

// Add Course event listener
AddBtn.addEventListener("click", () => {
    CourseCount++;
    const newCourse = document.createElement("div");
    newCourse.classList.add("course");
    newCourse.innerHTML = createCourseCardHTML(CourseCount);
    AllCoursesContainer.append(newCourse);
    updateCourseCountBadge();

    // Smoothly scroll the newly added course into view
    newCourse.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

// Remove Course event listener
RmvBtn.addEventListener("click", () => {
    const oldCourses = document.getElementsByClassName("course");
    if (CourseCount > 1) {
        oldCourses[CourseCount - 1].remove();
        CourseCount--;
        updateCourseCountBadge();
    }
});

/**
 * Evaluates performance and returns classification details according to institutional grading scale
 * @param {number} cgpa
 */
function getHonorStatus(cgpa) {
    if (cgpa >= 3.75) {
        return { text: "Outstanding / Highest Distinction", badgeClass: "badge-first-class", icon: "fa-award" };
    } else if (cgpa >= 3.50) {
        return { text: "High Distinction", badgeClass: "badge-first-class", icon: "fa-award" };
    } else if (cgpa >= 3.25) {
        return { text: "Distinction", badgeClass: "badge-first-class", icon: "fa-thumbs-up" };
    } else if (cgpa >= 3.00) {
        return { text: "Good Standing", badgeClass: "badge-second-class", icon: "fa-check" };
    } else if (cgpa >= 2.25) {
        return { text: "Satisfactory Passing", badgeClass: "badge-average", icon: "fa-arrow-trend-up" };
    } else {
        return { text: "Academic Warning (< 2.25)", badgeClass: "badge-warning", icon: "fa-triangle-exclamation" };
    }
}

/**
 * Calculates and renders the overall CGPA
 */
function printResult() {
    let FinalCGPA = 0;
    let Credit_Count = 0;
    let course_result = 0;
    let hasError = false;
    let filledCourses = 0;

    const allCourse = document.querySelectorAll(".course");

    allCourse.forEach((element) => {
        const CRED = element.getElementsByClassName("course-credit")[0];
        const CG = element.getElementsByClassName("course-cgpa")[0];
        
        const creditRaw = CRED ? CRED.value.trim() : "";
        const cgpaRaw = CG ? CG.value.trim() : "";

        if (creditRaw === "" || cgpaRaw === "") {
            hasError = true;
            return;
        }

        const creditVal = Number(creditRaw);
        const cgpaVal = Number(cgpaRaw);

        if (isNaN(creditVal) || creditVal <= 0 || isNaN(cgpaVal) || cgpaVal < 0 || cgpaVal > 4.00) {
            hasError = true;
            return;
        }

        Credit_Count += creditVal;
        course_result += (cgpaVal * creditVal);
        filledCourses++;
    });

    const resultDiv = document.getElementById("Result");

    if (hasError || filledCourses === 0 || Credit_Count === 0) {
        resultDiv.innerHTML = `
            <div class="result-card error">
                <i class="fas fa-circle-exclamation"></i>
                <div>
                    <strong>Please enter valid credit hours and points!</strong>
                    <div style="font-size: 0.85rem; opacity: 0.9; margin-top: 2px;">
                        Ensure all courses have both Credit Hours (greater than 0) and Grade Point (0.00 - 4.00) filled in.
                    </div>
                </div>
            </div>
        `;
    } else {
        FinalCGPA = course_result / Credit_Count;
        const status = getHonorStatus(FinalCGPA);
        const formattedCredits = Credit_Count.toFixed(2).replace(/\.00$/, '');

        resultDiv.innerHTML = `
            <div class="result-card success">
                <div class="result-card-inner">
                    <div class="result-main">
                        <span class="result-label">Cumulative GPA</span>
                        <div class="result-score-row">
                            <span class="result-number">${FinalCGPA.toFixed(2)}</span>
                            <span class="result-max">/ 4.00</span>
                        </div>
                        <span class="result-badge ${status.badgeClass}">
                            <i class="fas ${status.icon}"></i> ${status.text}
                        </span>
                    </div>
                    <div class="result-stats">
                        <div class="stat-pill">
                            <span class="stat-value">${formattedCredits}</span>
                            <span class="stat-label">Total Credits</span>
                        </div>
                        <div class="stat-pill">
                            <span class="stat-value">${allCourse.length}</span>
                            <span class="stat-label">Courses</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Smoothly scroll the result banner into view
    resultDiv.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

/**
 * Resets the calculator back to initial state
 */
function resetCalc() {
    const allCourseDiv = document.getElementById("AllCourses");
    const displayDiv = document.getElementById("Result");

    allCourseDiv.innerHTML = `
        <div class="course">
            ${createCourseCardHTML(1)}
        </div>
    `;

    displayDiv.innerHTML = `
        <div class="result-placeholder">
            <div class="result-placeholder-icon">
                <i class="fas fa-chart-pie"></i>
            </div>
            <div class="result-placeholder-text">
                <h3>No Calculation Yet</h3>
                <p>Fill in your courses below and click <strong>Calculate CGPA</strong> to view your GPA score.</p>
            </div>
        </div>
    `;

    CourseCount = 1;
    updateCourseCountBadge();
}

