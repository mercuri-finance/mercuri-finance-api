import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const NavContainer = styled.div<{
  single?: boolean;
  next?: boolean;
  prev?: boolean;
}>`
  display: flex;
  justify-content: ${({ single, next, prev }) =>
    single && next
      ? 'flex-end'
      : single && prev
      ? 'flex-start'
      : 'space-between'};
  gap: 1rem;
  margin-top: 4rem;
  padding-top: 2rem;
`;

const Card = styled(Link)<{ single?: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1.5rem;
  background: #0e1217;
  border: 1px solid #1e252b;
  border-radius: 12px;
  color: #d1d5db;
  text-decoration: none;
  transition: all 0.2s ease;
  position: relative;
  width: ${({ single }) => (single ? '50%' : '100%')};
  max-width: 420px;
  box-sizing: border-box;

  &:hover {
    border-color: #e3ffc1;
    color: #ffffff;
    background: #10161d;
  }
`;

const Label = styled.span`
  font-size: 0.85rem;
  color: #9ca3af;
`;

const Title = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
`;

const GroupNav = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  padding-top: 1rem;
  font-weight: 600;
  font-size: 0.95rem;
  color: #e5e7eb;

  a {
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    transition: color 0.2s ease;

    &:hover {
      color: #e3ffc1;
    }
  }
`;

type PageFooterNavProps = {
  prev?: { title: string; href: string };
  next?: { title: string; href: string };
  prevGroup?: { title: string; href: string };
  nextGroup?: { title: string; href: string };
};

export const PageFooterNav: React.FC<PageFooterNavProps> = ({
  prev,
  next,
  prevGroup,
  nextGroup,
}) => {
  return (
    <>
      <NavContainer single prev={!!prev} next={!!next}>
        {prev && (
          <Card to={prev.href} single>
            <Label>Previous</Label>
            <Title>{prev.title}</Title>
          </Card>
        )}

        {next && (
          <Card to={next.href} single>
            <Label>Next</Label>
            <Title>{next.title}</Title>
          </Card>
        )}
      </NavContainer>

      {(prevGroup || nextGroup) && (
        <GroupNav>
          {prevGroup ? (
            <Link to={prevGroup.href}>
              <ChevronLeft size={16} color="#a5afc0" /> {prevGroup.title}
            </Link>
          ) : (
            <span />
          )}
          {nextGroup ? (
            <Link to={nextGroup.href}>
              {nextGroup.title} <ChevronRight size={16} color="#a5afc0" />
            </Link>
          ) : (
            <span />
          )}
        </GroupNav>
      )}
    </>
  );
};
