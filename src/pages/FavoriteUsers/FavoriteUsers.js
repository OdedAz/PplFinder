import React from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import * as S from "./style";

const FavoriteUsers = () => {
  const users  =  JSON.parse(sessionStorage.getItem("favoriteUsers"));
  const dataSource = "favoriteUsers"
  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder
          </Text>
        </S.Header>
        <UserList users={users} dataSource={dataSource}/>
      </S.Content>
    </S.Home>
  );
};

export default FavoriteUsers;
