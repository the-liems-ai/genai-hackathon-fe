import { Button, Group, TextInput } from "@mantine/core";
import { IconEraser, IconSearch } from "@tabler/icons-react";
import { ChangeEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";

const SearchBar = () => {
    const [_, setQueryParams] = useSearchParams();
    const [keyword, setKeyword] = useState<string>("");

    const handleSearch = () => {
        setQueryParams({ keyword });
    };

    const handleClear = () => {
        setKeyword("");
        setQueryParams({});
    };
    return (
        <Group mb={"xl"}>
            <TextInput
                className="grow"
                value={keyword}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setKeyword(e.target.value)
                }
            />
            <Button
                onClick={handleSearch}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSearch();
                    }
                }}
            >
                <IconSearch size={18} />
            </Button>
            <Button color="red" onClick={handleClear}>
                <IconEraser size={18} />
            </Button>
        </Group>
    );
};

export default SearchBar;
