import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ListItem = styled(Link)`
  display: block;
  padding: 0.75rem 1rem;
  background: #0e1217;
  border: 1px solid #1e252b;
  border-radius: 10px;
  color: #aeb9c8;
  text-decoration: none;
  transition: all 0.2s ease;
  font-size: 0.95rem;

  &:hover {
    border-color: #e3ffc1;
    color: #ffffff;
    background: #10161d;
  }

  h4 {
    margin: 0;
    font-size: 1rem;
    color: #ffffff;
  }

  p {
    margin: 0.25rem 0 0;
    font-size: 0.85rem;
    color: #aeb9c8;
  }
`;

export const DocsList = ({
  items,
  title,
}: {
  title?: string;
  items: { title: string; desc: string; to: string }[];
}) => (
  <>
    {title && <h4>{title}</h4>}
    <ListContainer>
      {items.map((item) => (
        <ListItem key={item.to} to={item.to}>
          <h4>{item.title}</h4>
          <p>{item.desc}</p>
        </ListItem>
      ))}
    </ListContainer>
  </>
);
