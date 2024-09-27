const AddBtn = document.getElementById("addBtn");
const RmvBtn = document.getElementById("rmvBtn");
let CourseCount = 1;

AddBtn.addEventListener("click", ()=>{
    const newCourse = document.createElement("div");
    newCourse.classList.add("course");
    CourseCount++;
    newCourse.innerHTML = `
    <div>
            <label for="course1">Course Name:</label>
            <input type="text" id="course1" placeholder="(optional)">
        </div>
        <div>
            <label for="credit1">Credit Hour:</label>
            <input type="number" id="credit1" step="0.25" min="1" max="10" class="course-credit">
        </div>
        <div>
            <label for="cgpa1">Point:</label>
            <input type="number" id="cgpa1" step="0.01" min="0" max="10" class="course-cgpa">
    </div>`;
    document.getElementById("AllCourses").append(newCourse);
})

RmvBtn.addEventListener("click", ()=>{
    oldCourses = document.getElementsByClassName("course");
    if (CourseCount > 1) { 
        oldCourses[CourseCount - 1].remove(); 
        CourseCount--;
    }
})

function printResult(){
    let FinalCGPA = 0;
    let Credit_Count = 0;
    let course_result = 0;
    const allCourse = document.querySelectorAll(".course");
    allCourse.forEach((element)=>{
        const CRED = element.getElementsByClassName("course-credit");
        Credit_Count += Number(CRED[0].value);
        const CG = element.getElementsByClassName("course-cgpa");
        course_result += Number((Number(CG[0].value))*(Number(CRED[0].value)));
    })
    FinalCGPA += (course_result/Credit_Count);
    resultDiv = document.getElementById("Result");
    if(isNaN(FinalCGPA)){
        resultDiv.innerHTML = `<p>please add credit hour!</p>`;
    }
    else{
        resultDiv.innerHTML = `<p>CGPA : ${FinalCGPA.toFixed(2)}</p>`;
    }
}
function resetCalc(){
    AllCourseDiv = document.getElementById("AllCourses");
    DisplayDiv = document.getElementById("Result");
    AllCourseDiv.innerHTML = `
    <div class="course">
            <div>
                <label for="course1">Course Name:</label>
                <input type="text" id="course1" placeholder="(optional)">
            </div>
            <div>
                <label for="credit1">Credit Hour:</label>
                <input type="number" id="credit1" step="0.25" min="1" max="10" class="course-credit">
            </div>
            <div>
                <label for="cgpa1">Point:</label>
                <input type="number" id="cgpa1" step="0.01" min="0" max="10" class="course-cgpa">
            </div>
        </div>`;
    DisplayDiv.innerHTML = `<p aria-label="Calculated CGPA">CGPA: </p>`;
    CourseCount = 1;
}

























