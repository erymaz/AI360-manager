import {WorkspaceLogo} from "./workspace-logo";
import {WorkspaceDto, WorkspaceRole} from "@/types";
import styled from "@emotion/styled";
import {MoreVert} from "@mui/icons-material";
import {IconButton, Menu, MenuItem} from "@mui/material";
import Link from "next/link";
import {useRef, useState} from "react";
import {useClerk} from "@clerk/nextjs";


const StyledWorkspaceCard = styled.div`
    cursor: pointer;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    padding: 1rem;
    background: #ffffff;
    box-shadow: 0px 10px 14px -12px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    position: relative;
`;

const Dropdown = styled.div`
    position: absolute;
    top: 1rem;
    right: 1rem;
`;

const WorkspaceCardHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

const WorkspaceCardBody = styled.div`
    max-width: 100%;
    overflow: hidden;
`;

const WorkspaceName = styled.h4`
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 1rem 0 0.5rem;
`;

const WorkspaceMembers = styled.div`
    margin-bottom: 0.5rem;
    font-size: 14px;
    color: #9ca5af;
`;

const WorkspaceLink = styled(Link)`
    text-decoration: none;
    color: #3e4856;
    display: block;
    width: 100%;
`;

export const WorkspaceCard = ({
                                  item,
                                  onWorkspaceDeleted,
                              }: {
    item: WorkspaceDto;
    onWorkspaceDeleted: (workspace: WorkspaceDto) => void;
}) => {
    const {session} = useClerk();
    const anchor = useRef(null);
    const [openMenu, setOpenMenu] = useState(false);

    const member =
        session?.user.firstName && session.user.lastName
            ? session?.user.firstName + " " + session.user.lastName
            : session?.user.emailAddresses[0].emailAddress;

    return (
        <StyledWorkspaceCard>
            {item.currentUserRole === WorkspaceRole.ADMIN && (
                <Dropdown>
                    <IconButton
                        ref={anchor}
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenu(true);
                        }}
                    >
                        <MoreVert/>
                    </IconButton>
                    <Menu
                        MenuListProps={{"aria-labelledby": "long-button"}}
                        anchorEl={anchor.current}
                        open={openMenu}
                        onClose={() => setOpenMenu(false)}
                        PaperProps={{style: {maxHeight: 200, width: "20ch"}}}
                    >
                        <MenuItem key={"option"} onClick={(e) => onWorkspaceDeleted(item)}>
                            Delete
                        </MenuItem>
                    </Menu>
                </Dropdown>
            )}
            <WorkspaceLink href={`/workspaces/${item.id}`}>
                <WorkspaceCardHeader>
                    <WorkspaceLogo workspace={item}/>
                </WorkspaceCardHeader>
                <WorkspaceCardBody>
                    <WorkspaceName>{item.workspaceName}</WorkspaceName>
                    <WorkspaceMembers>{member}</WorkspaceMembers>
                </WorkspaceCardBody>
            </WorkspaceLink>
        </StyledWorkspaceCard>
    );
};
