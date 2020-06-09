import styled from "styled-components";

const Text = styled.span`
  display: inline-block;
  color: ${({ theme, color }) => theme.colors[color]};
  font-size: ${({ theme, fontSize }) => theme.fontSizes[fontSize] || theme.fontSizes.md};
  font-weight: ${({ theme, fontWeight }) =>
    theme.fontWeights[fontWeight] || theme.fontWeights.regular};
`;

export default Text;
