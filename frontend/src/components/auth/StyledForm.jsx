import styled from "styled-components";

export const StyledForm = styled.form`
  max-width: 400px;
  width: 100%;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  max-height: 300px;
  h2 {
    margin-bottom: 30px;
  }
  button,
  input {
    height: 35px;
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    border-radius: 5px;
    border: 0.5px solid black;

    &:focus {
      border: 3px solid cyan;
    }
  }
  button:hover {
    cursor: pointer;
    background-color: green;
  }
  p {
    font-size: 15px;
    color: red;
  }
`;
