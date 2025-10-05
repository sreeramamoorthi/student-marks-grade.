let students = JSON.parse(localStorage.getItem('students')) || [];
        let editingIndex = -1;

        function addOrUpdateStudent(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const age = document.getElementById('age').value;
            const grade = document.getElementById('grade').value;

            if (editingIndex === -1) {
                students.push({ name, age, grade });
            } else {
                students[editingIndex] = { name, age, grade };
                editingIndex = -1;
                document.getElementById('submitButton').textContent = 'Add Student';
            }

            localStorage.setItem('students', JSON.stringify(students));
            document.getElementById('studentForm').reset();
            renderStudents();
        }

        function renderStudents() {
            const tbody = document.getElementById('studentList');
            tbody.innerHTML = '';
            students.forEach((student, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${student.name}</td>
                    <td>${student.age}</td>
                    <td>${student.grade}</td>
                    <td class="action-buttons">
                        <button onclick="editStudent(${index})">Edit</button>
                        <button onclick="deleteStudent(${index})">Delete</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        }

        function editStudent(index) {
            editingIndex = index;
            const student = students[index];
            document.getElementById('name').value = student.name;
            document.getElementById('age').value = student.age;
            document.getElementById('grade').value = student.grade;
            document.getElementById('submitButton').textContent = 'Update Student';
        }

        function deleteStudent(index) {
            if (confirm('Are you sure you want to delete this record?')) {
                students.splice(index, 1);
                localStorage.setItem('students', JSON.stringify(students));
                renderStudents();
            }
        }

        // Initial render
        renderStudents();