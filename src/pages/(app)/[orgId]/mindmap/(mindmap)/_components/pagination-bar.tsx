import { Group, Pagination } from "@mantine/core";
import { useSearchParams } from "react-router-dom";

const PaginationBar = ({ total }: { total: number }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    return (
        <Group my={"xl"} justify="center">
            <Pagination
                total={total}
                siblings={2}
                value={+searchParams.get("page") || 1}
                onChange={(page) => setSearchParams({ page: page.toString() })}
            />
        </Group>
    );
};

export default PaginationBar;