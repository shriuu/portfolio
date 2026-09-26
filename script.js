const canvas = document.getElementById('signal');
const context = canvas.getContext('2d');
let phase = 0;

function drawSignal() {
  const scale = devicePixelRatio || 1;
  canvas.width = innerWidth * scale;
  canvas.height = innerHeight * scale;
  context.setTransform(scale, 0, 0, scale, 0, 0);
  context.clearRect(0, 0, innerWidth, innerHeight);
  context.strokeStyle = 'rgba(215,255,67,.25)';
  context.lineWidth = 1;
  for (let row = 0; row < 13; row++) {
    const y = innerHeight * .1 + row * (innerHeight / 14);
    context.beginPath();
    for (let x = 0; x < innerWidth; x += 6) {
      const movement = Math.sin(x * .016 + phase + row * .7) * 10 + Math.sin(x * .05 - phase) * 3;
      x === 0 ? context.moveTo(x, y + movement) : context.lineTo(x, y + movement);
    }
    context.stroke();
  }
  phase += .008;
  requestAnimationFrame(drawSignal);
}
drawSignal();

const terminal = document.getElementById('terminal');
const input = document.getElementById('commandInput');
const output = document.getElementById('terminalOutput');
function toggleTerminal() {
  terminal.classList.toggle('open');
  terminal.setAttribute('aria-hidden', !terminal.classList.contains('open'));
  if (terminal.classList.contains('open')) input.focus();
}
document.getElementById('terminalToggle').onclick = toggleTerminal;
document.getElementById('footerTerminal').onclick = toggleTerminal;
document.getElementById('terminalClose').onclick = toggleTerminal;

const replies = {
  help: 'Commands: help, about, contact, work, clear',
  about: 'I’m Shrimayee Uyala — a Data & AI Engineer working at the intersection of reliable data systems and agentic AI.',
  contact: 'You can reach me at shrimayee0305@gmail.com',
  work: 'Scroll down to see Kheti Sahayak, Dynamic QR Attendance, and Fake Product Detection.',
  clear: ''
};
function run(command) {
  const clean = command.trim().toLowerCase();
  if (!clean) return;
  output.innerHTML = clean === 'clear' ? '' : `${output.innerHTML}<br /><span style="color:#d7ff43">&gt; ${clean}</span><br />${replies[clean] || `command not found: ${clean}. Try help.`}`;
  input.value = '';
  terminal.scrollTop = terminal.scrollHeight;
}
document.getElementById('commandForm').addEventListener('submit', event => { event.preventDefault(); run(input.value); });
output.addEventListener('click', event => { if (event.target.dataset.command) run(event.target.dataset.command); });
