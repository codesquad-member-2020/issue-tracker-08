import styled from "styled-components";

const Button = styled.button`
  background-color: ${({ theme, backgroundColor }) => theme.colors[backgroundColor] || theme.colors.green};
  color: ${({ theme, color }) => theme.colors[color] || theme.colors.white};
  font-size: ${({ theme, fontSize }) => theme.fontSizes[fontSize] || theme.fontSizes.md};
  font-weight: ${({ bold }) => (bold ? "bold" : "normal")};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  text-align: center;
  padding: ${({ paddingSize }) => (paddingSize ? paddingSize : "10px 15px")};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export default Button;
