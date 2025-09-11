/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <231> */
import InputText from "./input-text";
import SearchIcon from "../assets/icons/search.svg?react";
import React from "react";
import { debounce } from "../helpers/utils";
import usePhotos from "../contexts/photos/hooks/use-photos";

export default function PhotoSearch() {
  const [inputValue, setInputValue] = React.useState("");
  const { filters } = usePhotos();

  const debouncedSetValue = React.useCallback(
    debounce((value: string) => {
      filters.setSearch(value);
    }, 200),
    [filters.setSearch],
  );

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    setInputValue(value);
    debouncedSetValue(value);
  }

  return (
    <InputText
      icon={SearchIcon}
      placeholder="Buscar fotos"
      className="flex-1"
      value={inputValue}
      onChange={handleInputChange}
    />
  );
}
