import { Button, Group, TextInput } from "@mantine/core";
import { IconEraser, IconSearch } from "@tabler/icons-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";

const SearchBar = () => {
    const [_, setQueryParams] = useSearchParams();
    const [keyword, setKeyword] = useState<string>("");

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setQueryParams({ keyword: keyword.trim() });
    };

    const handleClear = () => {
        setKeyword("");
        setQueryParams({});
    };
    return (
        <Group mb={"xl"}>
            <form className="flex grow gap-4" onSubmit={handleSearch}>
                <TextInput
                    className="grow"
                    value={keyword}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setKeyword(e.target.value)
                    }
                    placeholder="Search mindmap"
                />

                <Button type="submit">
                    <IconSearch size={18} />
                </Button>
            </form>
            <Button color="red" onClick={handleClear}>
                <IconEraser size={18} />
            </Button>
        </Group>
    );
};

export default SearchBar;
