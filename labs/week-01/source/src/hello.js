const student = {
  name: "ชื่อ นาย กฤษณพงศ์ ชัยสุ",
  studentId: "รหัสนักศึกษา 68543210001-2",
  os: process.platform,
  node: process.version,
};

function createGreeting({ name, studentId, os, node }) {
  return `Hello ${name} (${studentId}) | OS: ${os} | Node: ${node}`;
}

console.log(createGreeting(student));
