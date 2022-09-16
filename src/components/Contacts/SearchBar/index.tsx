import {Input, InputAdornment, InputLabel} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {ChangeEvent, FC} from "react";

type Props = {
    value: string,
    search: (e: ChangeEvent<HTMLInputElement>) => void
}

export const SearchBar:FC<Props> = ({value,search}) => {
    return (
        <>
            <InputLabel htmlFor="input-with-icon-adornment">
                Поиск по имени
            </InputLabel>
            <Input
                id="input-with-icon-adornment"
                startAdornment={
                    <InputAdornment position="start">
                        <SearchIcon/>
                    </InputAdornment>
                }
                value={value}
                onChange={(e: ChangeEvent<HTMLInputElement>) => search(e)}
            />
        </>
    )
}