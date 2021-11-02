import "./App.css";
import styled from "styled-components";
import * as color from "./common/color";
const Logo = styled.h1`
  color: ${color.primary};
`;

function App() {
  return (
    <div className="App">
      <Logo>Velog</Logo>
    </div>
  );
}

export default App;
