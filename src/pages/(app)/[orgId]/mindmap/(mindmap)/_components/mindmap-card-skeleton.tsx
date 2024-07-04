import { Card, Group, Skeleton, Stack, Text } from "@mantine/core";

const MindmapCardSkeleton = () => {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder h={340}>
            <Card.Section>
                <Skeleton height={164} radius={0} />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="md">
                <Skeleton width={100} height={24} />
            </Group>

            <Stack gap={10} className="grow">
                <Skeleton height={16} />
                <Skeleton height={16} width={200} />
            </Stack>

            <Group gap={8}>
                <Skeleton
                    height={36}
                    width={"default"}
                    className="grow"
                    radius={"md"}
                />
                <Skeleton width={40} height={36} radius={"md"} />
            </Group>
        </Card>
    );
};

export default MindmapCardSkeleton;
