let courseCount = 1;

function addCourse(){
    courseCount++;
    const container = document.getElementById('AllCourses');
    
    const newCourse = document.createElement('div');
    newCourse.classList.add('course');
    newCourse.innerHTML = 
    `
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
    `;
    container.appendChild(newCourse);
}
function printResult(){
    let FinalCGPA = 0;
    let Credit_Count = 0;
    let course_result = 0;
    const allCourse = document.querySelectorAll(".course");

    allCourse.forEach((element)=>{
        const CRED = element.getElementsByClassName("course-credit")
        Credit_Count += Number(CRED[0].value);
        const CG = element.getElementsByClassName("course-cgpa");
        course_result += Number((Number(CG[0].value))*(Number(CRED[0].value)));

    })
    FinalCGPA += (course_result/Credit_Count);
    resultDiv = document.getElementById("Result");
    if(isNaN(FinalCGPA)){
        resultDiv.innerHTML = `<p>please add credit hour!</p>`
    }
    else{
        resultDiv.innerHTML = `<p>CGPA : ${FinalCGPA.toFixed(2)}</p>`
    }
}
function resetCalc(){
    Body = document.body;
    Body.innerHTML = `
    <div class="overlay">
        <h1>CGPA CALCULATOR</h1>
        <div>
            <button onclick="addCourse()" class="addBtn">Add Course</button>
            <button onclick="printResult()" class="resultBtn">Calculate CGPA</button>
            <button onclick="resetCalc()" class="resetBtn">Reset Program</button>
        </div>
        <div class="container1">
            <div id="Result">
                <p aria-label="Calculated CGPA">CGPA: </p>
            </div>
            <div id="AllCourses">
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
                </div>
            </div>
        </div>
    </div>
    <footer>
        <div class="footer-content">
          <ul class="social-links">
            <li><a href="https://facebook.com/nadman.alvee" target="_blank"><i class="fab fa-facebook"></i> Facebook</a></li>
            <li><a href="https://github.com/NadmanAlvee" target="_blank"><i class="fab fa-github"></i> GitHub</a></li>
            <li><i class="fas fa-envelope"></i> nadmanalvee@gmail.com</a></li>
          </ul>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2024 Nadman Alvee. All Rights Reserved.</p>
        </div>
    </footer>
    <script src="index.js"></script>`
}

























