import React, { useState, useEffect } from "react"
import axios from "axios"
import TeamBox from "./TeamBox"
import {
    Grid,
    Container,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField
} from "@mui/material"

const TeamsContainer = () => {
    const [coaches, setCoaches] = useState([])
    const [pokemonData, setPokemonData] = useState([])
    const [filteredCoaches, setFilteredCoaches] = useState([])
    const [filter, setFilter] = useState("None")
    const [searchText, setSearchText] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiKey = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY
                const response = await axios.get(
                    `https://sheets.googleapis.com/v4/spreadsheets/1E3wHnKj8i4C40Lj7SwKcVrbPhOFUdzNkJnpGuTwe73I/values/Coaches?key=${apiKey}`
                )

                const values = response.data.values

                // Assuming the first row contains headers
                const headers = values[0]
                const data = values.slice(1)

                // Map the data before filtering and sorting
                const mappedData = data.map((row) => {
                    const coach = {}
                    headers.forEach((header, index) => {
                        coach[header] = row[index]
                    })
                    return coach
                })

                // Filter out rows with empty or non-numeric Pts values
                const filteredData = mappedData.filter(
                    (row) => row["Coach"] != ""
                )
                if (coaches.length === 0) setCoaches(filteredData)
                setFilteredCoaches(mappedData)
            } catch (error) {
                console.error("Error fetching data from Google Sheets:", error)
            }
        }

        if (coaches.length === 0) fetchData()
    }, [])

    useEffect(() => {
        const filterCoaches = () => {
            if (filter === "Scarlet") {
                return coaches.filter((coach) => coach.League === "s")
            } else if (filter === "Violet") {
                return coaches.filter((coach) => coach.League === "v")
            } else {
                return coaches
            }
        }

        setFilteredCoaches(filterCoaches())
    }, [coaches, searchText])

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const handleSearchTextChange = (event) => {
        const searchTextValue = event.target.value.toLowerCase()

        // Filter coaches based on search text
        const filteredData = coaches.filter((coach) =>
            coach.Name.toLowerCase().includes(searchTextValue)
        )

        setFilteredCoaches(filteredData)
        setSearchText(searchTextValue)
    }

    useEffect(() => {
        const filterCoaches = () => {
            // Filter based on the selected league (Scarlet, Violet, or None)
            if (filter === "Scarlet") {
                return coaches.filter((coach) => coach.League === "s")
            } else if (filter === "Violet") {
                return coaches.filter((coach) => coach.League === "v")
            } else {
                return coaches
            }
        }

        // Filter based on search text
        const searchCoaches = () => {
            return filteredCoaches.filter((coach) =>
                coach.Name.toLowerCase().includes(searchText.toLowerCase())
            )
        }

        // Combine both filters
        const filteredData = searchCoaches(filterCoaches())
        setFilteredCoaches(filteredData)
    }, [coaches, filter, searchText])

    return (
        <div
            style={{
                overflowX: "auto",
                overflowY: "hidden",
                textAlign: "center"
            }}
        >
            <Typography variant="h4" component="div" gutterBottom>
                Teams
            </Typography>
            <TextField
                label="Search"
                variant="filled"
                value={searchText}
                onChange={handleSearchTextChange}
                style={{
                    marginRight: "8px",
                    marginBottom: "16px", // Adjust the margin as needed
                    backgroundColor: "white"
                }}
            />
            <FormControl
                style={{
                    minWidth: 120,
                    marginBottom: "16px",
                    backgroundColor: "white"
                }}
            >
                <Select
                    id="filter-select"
                    value={filter}
                    variant="filled"
                    onChange={handleFilterChange}
                    style={{ minWidth: 120, backgroundColor: "white" }}
                >
                    <MenuItem value="None">None</MenuItem>
                    <MenuItem value="Scarlet">Scarlet</MenuItem>
                    <MenuItem value="Violet">Violet</MenuItem>
                </Select>
            </FormControl>
            <Container
                maxWidth="xl"
                className="pokemon-tiers-scroll-container"
                style={{
                    display: "flex",
                    flexDirection: "row",
                    overflowX: "scroll",
                    overflowY: "scroll",
                    maxHeight: "90vh",
                    minWidth: "99vw"
                }}
            >
                <Grid container spacing={2}>
                    {filteredCoaches.map((coach, index) => (
                        <Grid
                            item
                            key={index + 1}
                            xs={12}
                            sm={6}
                            md={4}
                            lg={2}
                            style={{
                                minWidth: "15vw"
                            }}
                        >
                            <TeamBox
                                coach={coach.Name}
                                color={
                                    coach?.League === "S"
                                        ? "#B4374E"
                                        : "#8A66FF"
                                }
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    )
}

export default TeamsContainer
