import React, { useState } from "react"
import { HashRouter as Router, Route, Routes, Link } from "react-router-dom"
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Box,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon
} from "@mui/material"
import clsx from "clsx"
import MenuIcon from "@mui/icons-material/Menu"
import { makeStyles } from "@mui/styles"

import PokemonTiersPage from "./components/TierList/PokemonTiersPage"
import TeamsPage from "./components/Teams/TeamsPage"

import DashboardIcon from "@mui/icons-material/Dashboard"
import HomeIcon from "@mui/icons-material/Home"
import GroupIcon from "@mui/icons-material/Group"

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    appBar: {
        zIndex: "1400"
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: "pink",
        flexShrink: 0
    },
    content: {
        flexGrow: 1,
        paddingTop: "24px",
        paddingLeft: "8px"
    }
}))

function HomePage() {
    return <div>Blank Home Page</div>
}

function App() {
    const classes = useStyles()

    const [drawerOpen, setDrawerOpen] = useState(false)

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen)
    }

    return (
        <div className={classes.root}>
            <Router>
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar)}
                    PaperProps={{ elevation: 24 }}
                >
                    <Toolbar style={{ justifyContent: "space-between" }}>
                        <Typography variant="h6" noWrap>
                            Pokemon Drafting Tool
                        </Typography>
                        <IconButton
                            size="large"
                            edge="end"
                            color="inherit"
                            onClick={toggleDrawer}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <Drawer
                    className={classes.drawer}
                    anchor="right"
                    open={drawerOpen}
                    onClose={toggleDrawer}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                >
                    <List>
                        <ListItem button component={Link} to="/">
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
                        <ListItem button component={Link} to="/tiers">
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Tiers" />
                        </ListItem>
                        <ListItem button component={Link} to="/teams">
                            <ListItemIcon>
                                <GroupIcon />
                            </ListItemIcon>
                            <ListItemText primary="Teams" />
                        </ListItem>
                    </List>
                </Drawer>

                <Box component="main" className={classes.content}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/tiers" element={<PokemonTiersPage />} />
                        <Route path="/teams" element={<TeamsPage />} />
                    </Routes>
                </Box>
            </Router>
        </div>
    )
}

export default App
