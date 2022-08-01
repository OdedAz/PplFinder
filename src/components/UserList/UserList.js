import React, { useEffect, useState, useRef } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";

import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";
import { countryFilters } from "../../constant";

const FiltersHeader = ({ onChange }) => (
  <S.Filters>
    <CheckBox value="BR" label="Brazil" onChange={onChange} />
    <CheckBox value="AU" label="Australia" onChange={onChange} />
    <CheckBox value="CA" label="Canada" onChange={onChange} />
    <CheckBox value="GE" label="Germany" onChange={onChange} />
    <CheckBox value="MX" label="Mexico" onChange={onChange} />
  </S.Filters>
);

const UserList = ({ users, isLoading = false, increasePage, dataSource }) => {
  const [hoveredUserId, setHoveredUserId] = useState();
  const [selectedCountriesFilters, setSelectedCountriesFilters] = useState([]);
  const sessionFavoriteUsers = JSON.parse(sessionStorage.getItem("favoriteUsers"));
  const [favoriteUsers, setFavoriteUsers] = useState(sessionFavoriteUsers);
  const usersListRef = useRef();

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId(null);
  };

  const handleScroll = () => {
    if (usersListRef?.current && dataSource === "home") {
      const { scrollTop, scrollHeight, clientHeight } = usersListRef?.current;
      if (scrollTop + clientHeight === scrollHeight) {
        increasePage();
      }
    }
  };

  useEffect(() => {
    document.querySelector(".list-wrapper").addEventListener("scroll", handleScroll);
  }, []);

  const chooseFavorite = async (user) => {
    const oldFavoriteUsers = sessionFavoriteUsers ? [...sessionFavoriteUsers] : [];
    let newFavoriteUsers = [...oldFavoriteUsers];
    const isAlreadyInFavorites = newFavoriteUsers.find(
      (x) => user?.id?.value === x?.id?.value
    );
    if (!isAlreadyInFavorites) {
      newFavoriteUsers.push(user);
    } else {
      newFavoriteUsers = favoriteUsers.filter((favoriteUser) => {
        console.log("test : ", user?.id?.value !== favoriteUser?.id?.value);
        return (
          parseInt(user?.id?.value) !== parseInt(favoriteUser?.id?.value) &&
          user?.id?.value !== favoriteUser?.id?.value
        );
      });
    }
    await setFavoriteUsers(newFavoriteUsers);
    await sessionStorage.setItem("favoriteUsers", JSON.stringify(newFavoriteUsers));
  };

  const checkIfFavorite = (user) => {
    const isFavorite = sessionFavoriteUsers?.findIndex((favoriteUser) => {
      if (
        favoriteUser?.id?.value === user?.id?.value &&
        favoriteUser?.id?.value &&
        user?.id?.value
      )
        return true;
    });
    if (isFavorite === -1 || isFavorite === undefined) return false;
    console.log("TRUE check both prints up to see if equele");
    return true;
  };

  const handleCheckCountry = (keyToMatch) => {
    const isFilteredCountry = selectedCountriesFilters?.find((key) => key === keyToMatch);
    const newSelectedCountriesFilters = [...selectedCountriesFilters];

    if (!isFilteredCountry) {
      const filterToAdd = countryFilters?.find(
        (countryFilter) => countryFilter?.key === keyToMatch
      );
      newSelectedCountriesFilters.push(filterToAdd?.key);
      setSelectedCountriesFilters(newSelectedCountriesFilters);
    } else {
      const indexOfFilter = selectedCountriesFilters.findIndex(
        (key) => key === keyToMatch
      );
      newSelectedCountriesFilters.splice(indexOfFilter, 1);
      setSelectedCountriesFilters(newSelectedCountriesFilters);

      if (newSelectedCountriesFilters?.length === 0) setSelectedCountriesFilters([]);
    }
  };

  const filterUsers = (usersList) => {
    return selectedCountriesFilters.length
      ? usersList?.filter((user) => selectedCountriesFilters.includes(user.nat))
      : usersList;
  };
  const dataToPresentInList = () => {
    return filterUsers(dataSource === "favoriteUsers" ? favoriteUsers : users);
  };

  return (
    <S.UserList>
      <FiltersHeader onChange={handleCheckCountry} />
      <S.List className="list-wrapper" ref={usersListRef}>
        {dataToPresentInList()?.map((user, index) => {
          const isHeartIconVisible = index === hoveredUserId || checkIfFavorite(user);
          return (
            <S.User
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave}
            >
              <S.UserPicture src={user?.picture?.large} alt="" />
              <S.UserInfo>
                <Text size="22px" bold>
                  {user?.name.title} {user?.name?.first} {user?.name?.last}
                </Text>
                <Text size="14px">{user?.email}</Text>
                <Text size="14px">
                  {user?.location?.street?.number} {user?.location?.street?.name}
                </Text>
                <Text size="14px">
                  {user?.location?.city} {user?.location?.country}
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
