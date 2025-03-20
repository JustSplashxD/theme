import styled from 'styled-components/macro';
import { breakpoint } from '@/theme';
import tw from 'twin.macro';

const ContentContainer = styled.div`
    max-width: calc(100% - 240px);
`;
ContentContainer.displayName = 'ContentContainer';

export default ContentContainer;
