import React, { useState } from "react";

// 1. Component Cháu: StudentItem
// Sử dụng Destructuring Assignment để nhận { student } và bóc tách { name, score }
const StudentItem = ({ student }) => {
  const { name, score } = student;

  // Sử dụng Template Literals để tạo chuỗi hiển thị
  const displayText = `${name} - Điểm: ${score}`;

  return (
    <li
      style={{
        padding: "8px 12px",
        marginBottom: "8px",
        backgroundColor: "#f9fafb",
        border: "1px solid #e5e7eb",
        borderRadius: "6px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span>{displayText}</span>
      <span
        style={{
          fontWeight: "bold",
          color: score >= 5 ? "#16a34a" : "#dc2626",
        }}
      >
        {score >= 5 ? "Đạt" : "Chưa đạt"}
      </span>
    </li>
  );
};

// 2. Component Con: StudentList
// Nhận props { students } bằng Destructuring
const StudentList = ({ students }) => {
  if (students.length === 0) {
    return <p style={{ color: "#6b7280" }}>Chưa có sinh viên nào trong danh sách.</p>;
  }

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {/* Sử dụng .map() kết hợp Arrow Function để render danh sách */}
      {students.map((student) => (
        <StudentItem key={student.id} student={student} />
      ))}
    </ul>
  );
};

// 3. Component Cha: App
const App = () => {
  // State quản lý danh sách sinh viên
  const [students, setStudents] = useState([
    { id: 1, name: "Nguyễn Văn A", score: 8.5 },
    { id: 2, name: "Trần Thị B", score: 4.0 },
  ]);

  // State quản lý giá trị nhập vào từ form
  const [newName, setNewName] = useState("");
  const [newScore, setNewScore] = useState("");

  // Hàm xử lý thêm sinh viên (Arrow Function)
  const handleAddStudent = (e) => {
    e.preventDefault();

    // Kiểm tra dữ liệu hợp lệ cơ bản
    if (!newName.trim() || newScore === "") {
      alert("Vui lòng nhập đầy đủ tên và điểm số!");
      return;
    }

    const numericScore = parseFloat(newScore);
    if (isNaN(numericScore) || numericScore < 0 || numericScore > 10) {
      alert("Điểm phải là số từ 0 đến 10!");
      return;
    }

    const newStudent = {
      id: Date.now(),
      name: newName.trim(),
      score: numericScore,
    };

    // Cập nhật danh sách sinh viên
    setStudents([...students, newStudent]);

    // Reset form
    setNewName("");
    setNewScore("");
  };

  return (
    <div
      style={{
        maxWidth: "480px",
        margin: "40px auto",
        padding: "24px",
        fontFamily: "Arial, sans-serif",
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#1e293b", marginBottom: "20px" }}>
        Ứng dụng Quản lý Điểm Sinh viên
      </h2>

      {/* Form nhập liệu */}
      <form onSubmit={handleAddStudent} style={{ marginBottom: "24px" }}>
        <div style={{ marginBottom: "12px" }}>
          <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>
            Họ và tên:
          </label>
          <input
            type="text"
            placeholder="Nhập tên sinh viên..."
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            style={{
              width: "100%",
              padding: "8px 10px",
              boxSizing: "border-box",
              borderRadius: "4px",
              border: "1px solid #cbd5e1",
            }}
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>
            Điểm số:
          </label>
          <input
            type="number"
            step="0.1"
            placeholder="Nhập điểm (0 - 10)..."
            value={newScore}
            onChange={(e) => setNewScore(e.target.value)}
            style={{
              width: "100%",
              padding: "8px 10px",
              boxSizing: "border-box",
              borderRadius: "4px",
              border: "1px solid #cbd5e1",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Thêm Sinh Viên
        </button>
      </form>

      {/* Danh sách hiển thị */}
      <h3 style={{ borderBottom: "2px solid #e2e8f0", paddingBottom: "8px" }}>
        Danh sách sinh viên ({students.length})
      </h3>
      <StudentList students={students} />
    </div>
  );
};

export default App;