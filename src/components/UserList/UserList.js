import React, { useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";

const UserList = ({ users, isLoading }) => {
  const [hoveredUserId, setHoveredUserId] = useState();
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [isFilterActivated, setIsFilterActivated] = useState(false);
  const [favoriteUsers, setFavoriteUsers] = useState([]);
  const filtersByState = [
    { key: "BR", value: "Brazil", checked: false },
    { key: "AU", value: "Australia", checked: false },
    { key: "CA", value: "Canada", checked: false },
    { key: "GE", value: "Germany", checked: false },
    { key: "MX", value: "Mexico", checked: false },
  ];

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  const chooseFavorite = (user) => {
    let newFavoriteUsers = [...favoriteUsers];
    const isAlreadyInFavorites = favoriteUsers.find(
      (x) => user?.id?.value === x?.id?.value
    );
    if (!isAlreadyInFavorites) {
      newFavoriteUsers.push(user);
    } else {
      newFavoriteUsers = favoriteUsers.filter(
        (favorituser) => user.id !== favorituser.id
      );
    }
    setFavoriteUsers(newFavoriteUsers);
    sessionStorage.setItem("favoritUsers", JSON.stringify(newFavoriteUsers));
    const sessionFavoritUsers = JSON.parse(sessionStorage.getItem("favoritUsers"));
  };

  const handleCheck = (event) => {
    const isFiltered = selectedFilters.filter((item) => item.key === event);
    if (isFiltered.length === 0) {
      const filterToAdd = filtersByState.filter((item) => item.key === event);
      setSelectedFilters([...selectedFilters, filterToAdd[0]]);
    } else {
      const indexOfFilter = selectedFilters.findIndex((item) => item.key === event);
      selectedFilters.splice(indexOfFilter, 1);
      if (selectedFilters.length === 0) setIsFilterActivated(false);
    }
    let filteredUsersList = [];
    if (selectedFilters.length > 0) setIsFilterActivated(true);
    for (let index in selectedFilters) {
      const newArray = users.filter((item) => item.nat === selectedFilters[index].key);
      filteredUsersList = filteredUsersList.concat(newArray);
    }
    setFilteredUsers(filteredUsersList);
  };

  const checkIfFavorite = (user) => {
    const isFavorite = favoriteUsers?.findIndex((favoriteUser) => {
      return favoriteUser.id === user.id;
    });
    console.log("here-isFavorite ", isFavorite);
    if (isFavorite === -1) return false;
    return true;
  };

  return (
    <S.UserList>
      <S.Filters>
        <CheckBox value="BR" label="Brazil" onChange={handleCheck} />
        <CheckBox value="AU" label="Australia" onChange={handleCheck} />
        <CheckBox value="CA" label="Canada" onChange={handleCheck} />
        <CheckBox value="GE" label="Germany" onChange={handleCheck} />
        <CheckBox value="MX" label="Mexico" onChange={handleCheck} />
      </S.Filters>
      <S.List>
        {(isFilterActivated ? filteredUsers : users).map((user, index) => {
          const isHeartIconVisible = ((index === hoveredUserId) || checkIfFavorite(user));
          return (
            <S.User
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave}
            >
              <S.UserPicture src={user?.picture.large} alt="" />
              <S.UserInfo>
                <Text size="22px" bold>
                  {user?.name.title} {user?.name.first} {user?.name.last}
                </Text>
                <Text size="14px">{user?.email}</Text>
                <Text size="14px">
                  {user?.location.street.number} {user?.location.street.name}
                </Text>
                <Text size="14px">
                  {user?.location.city} {user?.location.country}
                </Text>
              </S.UserInfo>
              <S.IconButtonWrapper isVisible={isHeartIconVisible}>
                <IconButton onClick={() => chooseFavorite(user)}>
                  <FavoriteIcon color="error" />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );
        })}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList>
  );
};

export default UserList;
