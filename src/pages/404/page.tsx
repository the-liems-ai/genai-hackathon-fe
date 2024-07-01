import { Container, Title, Text, Button, Group } from "@mantine/core"
import Illustration from "./illustration"
import classes from "./NothingFoundBackground.module.css"
import { cn } from "@/utils/cn"
import { Link, useLocation } from "react-router-dom"

export default function NotFoundPage() {
    const { pathname } = useLocation()
    return (
        <Container className={cn(classes.root, "h-screen")}>
            <div
                className={cn(
                    classes.inner,
                    "h-full flex flex-col items-center justify-center relative"
                )}
            >
                <Illustration className={cn(classes.image, "top-20")} />
                <div className={classes.content}>
                    <Title className={classes.title}>Nothing to see here</Title>
                    <Text
                        c="dimmed"
                        size="lg"
                        ta="center"
                        className={classes.description}
                    >
                        Page you are trying to open does not exist. You may have
                        mistyped the address, or the page has been moved to
                        another URL. If you think this is an error contact
                        support.
                    </Text>
                    <Group justify="center">
                        <Button
                            size="md"
                            component="a"
                            href={pathname}
                            variant="default"
                        >
                            Refresh page
                        </Button>
                        <Button size="md" component={Link} to="/">
                            Take me back to home page
                        </Button>
                    </Group>
                </div>
            </div>
        </Container>
    )
}
