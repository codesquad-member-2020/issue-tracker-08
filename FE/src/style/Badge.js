import styled from "styled-components";

const Badge = styled.span`
  background-color: ${({ theme, backgroundColor }) => theme.colors[backgroundColor] || backgroundColor || theme.colors.green};
  color: ${({ theme, color }) => theme.colors[color] || theme.colors.white};
  border: ${({ theme, borderColor }) => (borderColor ? `1px solid ${theme.colors[borderColor]}` : "")};
  border-radius: 2px;
  padding: ${({ big }) => (big ? "0.5em 0.6em" : "0.15em 4px")};
  margin-left: ${({ big }) => (big ? "" : "4px")};
  font-size: ${({ theme, big }) => (big ? theme.fontSizes.md : theme.fontSizes.sm)};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.fontSizes.sm};
`;

export default Badge;
