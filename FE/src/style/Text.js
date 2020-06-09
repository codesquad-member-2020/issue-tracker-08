import styled from "styled-components";

const Text = styled.span`
  display: inline-block;
  color: ${({ theme, color }) => theme.color[color]};
  font-size: ${({ theme, fontSizes }) => theme.fontSizes[fontSizes] || theme.fontSizes.md};
`;

export default Text;
