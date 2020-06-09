import styled from "styled-components";

const Button = styled.button`
  background-color: ${({ theme, backgroundColor }) =>
    theme.colors[backgroundColor] || theme.colors.green};
  color: ${({ theme, color }) => theme.colors[color] || theme.colors.white};
  font-size: ${({ theme, fontSize }) => theme.fontSizes[fontSize]};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  border-radius: 5px;
  border: none;
  text-align: center;
`;

export default Button;
