import { Box, Flex, Avatar, Text, Button } from "@radix-ui/themes";
import { CardDiv, StyledBox, StyledLink } from "./styles";
import { FollowButton,UnfollowButton } from "../Post/styles";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Link } from "react-router-dom";


interface ProfileCardProps {
    following: string[];
}


interface FollowingProps {
    id: string;
    username: string;
    email: string;
    isFollowing: boolean;

}



export function ProfileCard({ id, username, email,isFollowing }: FollowingProps){

    const user = useAuth()

    return(
        
        <StyledBox color="black">
            <StyledLink to={`/${username}`}>

                <CardDiv>
                    <Flex gap="3" align="center">
                    <Avatar
                        size="3"
                        src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
                        radius="full"
                        fallback="T"
                    />
                        <Box>
                            <Text as="div" size="2" weight="bold">
                                {username}
                            </Text>
                            <Text as="div" size="2" color="cyan">
                                {email}
                            </Text>
                        </Box>
                    
                        

                    {
                        isFollowing ? (
                            <UnfollowButton>Seguindo</UnfollowButton>
                        ) : (
                            <FollowButton>Seguir</FollowButton>
                        )
                    }
                    


                    </Flex>
                </CardDiv>
            </StyledLink>
            
        </StyledBox>
    )
}