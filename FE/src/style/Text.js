import styled from "styled-components";

const Text = styled.span`
  display: inline-block;
  color: ${({ theme, color }) => theme.colors[color] || color || theme.colors.black};
  font-size: ${({ theme, fontSize }) => theme.fontSizes[fontSize] || theme.fontSizes.md};
  font-weight: ${({ theme, fontWeight }) => theme.fontWeights[fontWeight] || theme.fontWeights.regular};
  line-height: ${({ lineHeight }) => lineHeight};
`;

export default Text;
