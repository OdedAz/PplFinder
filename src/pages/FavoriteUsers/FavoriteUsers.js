import React from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import Home from "pages/Home";
import * as S from "./style";

const FavoriteUsers = () => {
  let isLoading = true;
  const users  =  JSON.parse(sessionStorage.getItem("favoritUsers"));
  isLoading = false;
  const dataSorce = "FavoritUsers"
  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder
          </Text>
        </S.Header>
        <UserList users={users} isLoading={isLoading} dataSorce={dataSorce}/>
      </S.Content>
    </S.Home>
  );
};

export default FavoriteUsers;
