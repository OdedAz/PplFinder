import React, { useContext, useEffect, useState, useRef } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import { TabContext } from "TabContext";

import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";
import { countryFilters } from "../../constant";

const UserList = ({ users, isLoading, increasePage, dataSorce }) => {
  console.log("home page")

  const [hoveredUserId, setHoveredUserId] = useState();
  const [selectedCountriesFilters, setSelectedCountriesFilters] = useState([]);
  const sessionFavoritUsers = JSON.parse(sessionStorage.getItem("favoritUsers"));
  const [favoriteUsers, setFavoriteUsers] = useState(sessionFavoritUsers);
  const usersListRef = useRef();
  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };
  const handleScroll = () => {
    if (usersListRef.current && dataSorce==="home") {
      const { scrollTop, scrollHeight, clientHeight } = usersListRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        increasePage();
      }
    }
  };
  useEffect(() => {
    document.querySelector(".list-wrapper").addEventListener("scroll", handleScroll);
  }, []);

  const chooseFavorite = (user) => {
    const oldFavoritUsers = sessionFavoritUsers ? [...sessionFavoritUsers] : [];
    let newFavoriteUsers = [...oldFavoritUsers];
    const isAlreadyInFavorites = newFavoriteUsers.find(
      (x) => user?.id?.value === x?.id?.value
    );
    if (!isAlreadyInFavorites) {
      newFavoriteUsers.push(user);
    } else {
      newFavoriteUsers = favoriteUsers.filter((favorituser) => {
        return parseInt(user.id.value) !== parseInt(favorituser.id.value);
      });
    }
    setFavoriteUsers(newFavoriteUsers);
    sessionStorage.setItem("favoritUsers", JSON.stringify(newFavoriteUsers));
  };

  const checkIfFavorite = (user) => {
    const isFavorite = sessionFavoritUsers?.findIndex((favoriteUser) => {
      return favoriteUser.id.value === user.id.value;
    });
    if (isFavorite === -1) return false;
    return true;
  };

  const handleCheckCountry = (keyToMatch) => {
    const isFilteredCountry = selectedCountriesFilters.find((key) => key === keyToMatch);
    const newSelectedCountriesFilters = [...selectedCountriesFilters];

    if (!isFilteredCountry) {
      const filterToAdd = countryFilters.find(
        (countryFilter) => countryFilter.key === keyToMatch
      );
      newSelectedCountriesFilters.push(filterToAdd.key);
      setSelectedCountriesFilters(newSelectedCountriesFilters);
    } else {
      const indexOfFilter = selectedCountriesFilters.findIndex(
        (key) => key === keyToMatch
      );
      newSelectedCountriesFilters.splice(indexOfFilter, 1);
      setSelectedCountriesFilters(newSelectedCountriesFilters);

      if (newSelectedCountriesFilters.length === 0) setSelectedCountriesFilters([]);
    }
  };

  const dataToPresentInList = () => {
    const filteredUsers = selectedCountriesFilters.length
      ? users.filter((user) => selectedCountriesFilters.includes(user.nat))
      : users;
    return selectedCountriesFilters.length ? filteredUsers : users;
  };

  return (
    <S.UserList>
      <S.Filters>
        <CheckBox value="BR" label="Brazil" onChange={handleCheckCountry} />
        <CheckBox value="AU" label="Australia" onChange={handleCheckCountry} />
        <CheckBox value="CA" label="Canada" onChange={handleCheckCountry} />
        <CheckBox value="GE" label="Germany" onChange={handleCheckCountry} />
        <CheckBox value="MX" label="Mexico" onChange={handleCheckCountry} />
      </S.Filters>
      <S.List className="list-wrapper" ref={usersListRef}>
        {dataToPresentInList()?.map((user, index) => {
          const isHeartIconVisible = index === hoveredUserId || checkIfFavorite(user);
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
