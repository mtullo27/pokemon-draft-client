import React, { useState } from "react"
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from "@mui/material"
import { useNavigate } from "react-router-dom"

function LoginForm({ open, onClose, onLogin }) {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")

    const handleLogin = () => {
        // Perform any necessary login logic here
        onLogin(username)
        navigate("/user")
        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Username"
                    type="text"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleLogin}>Login</Button>
            </DialogActions>
        </Dialog>
    )
}

export default LoginForm
