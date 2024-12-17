body {
  font-family: 'Courier New', Courier, monospace;
  background: linear-gradient(135deg, #00c6ff, #0072ff);
  color: white;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title {
  font-size: 24px;
  color: yellow;
  text-shadow: 2px 2px 0 #000;
  margin-bottom: 10px;
}
.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  background-color: #333;
  border: 3px solid yellow;
  padding: 15px;
  border-radius: 10px;
}
button, input {
  padding: 10px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
}
button {
  background-color: #007bff;
  color: white;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
label {
  color: yellow;
  text-shadow: 1px 1px 0 #000;
}
input[type="range"] {
  width: 100px;
}
input[type="text"] {
  font-family: 'Courier New', Courier, monospace;
  width: 120px;
}
.canvas-container {
  margin-top: 20px;
  border: 3px solid yellow;
  padding: 10px;
  background-color: #222;
}
canvas {
  border: 2px dashed yellow;
    }
