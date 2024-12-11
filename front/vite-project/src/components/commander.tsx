import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from 'axios';

interface Mission {
    _id: string;
    description: string;
    priority: number;
    status: string;
    requiredPlanes:string
}

const Commander: React.FC = () => {
    const [missions, setMissions] = useState<Mission[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    // פונקציה לקבלת המשימות מהשרת
    const fetchMissions = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/missions/missions'); 
            setMissions(response.data.missions);
        } catch (error) {
            console.error('Failed to fetch missions:', error);
        } finally {
            setLoading(false);
        }
    };

    
    useEffect(() => {
        fetchMissions();
    }, []);

    // פונקציה למחיקת משימה
    const deleteMission = async (id: string) => {
        try {
            await axios.delete(`http://localhost:3000/missions/${id}`); 
            setMissions((prev) => prev.filter((mission) => mission._id !== id));
        } catch (error) {
            console.error('Failed to delete mission:', error);
        }
    };

    // פונקציה לשליחת משימה למגדל הפיקוח
    const sendMission = async (id: string) => {
        try {
            await axios.post(`http://localhost:3000/missions/execute/${id}`); 
            fetchMissions(); 
        } catch (error) {
            console.error('Failed to send mission:', error);
        }
    };

    // פונקציה לפתיחת טופס יצירת חייל חדש
    const handleCreateSoldier = () => {
        // לוגיקה לפתיחת קומפוננטת ההרשמה
        alert('פתיחת קומפוננטת יצירת חייל חדש');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 3,
                backgroundImage: 'url("/background.jpg")',
                backgroundSize: 'cover',
                minHeight: '100vh',
            }}
        >
            <Typography variant="h4" sx={{ marginBottom: 2, color: 'white' }}>
                דף המפקד
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: 1200 }}>
                {/* רשימת המשימות */}
                <Box sx={{ width: '30%', backgroundColor: 'rgba(0,0,0,0.7)', borderRadius: 2, padding: 2 }}>
                    <Typography variant="h6" sx={{ color: 'white', marginBottom: 2 }}>
                        המשימות
                    </Typography>
                    {loading ? (
                        <Typography sx={{ color: 'white' }}>טוען משימות...</Typography>
                    ) : (
                        <List>
                            {missions.map((mission) => (
                                <React.Fragment key={mission._id}>
                                    <ListItem
                                        sx={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                            borderRadius: 1,
                                            marginBottom: 1,
                                        }}
                                    >
                                        <ListItemText
                                            primary={mission.description}
                                            secondary={`priority: ${mission.priority}, status: ${mission.status},requiredPlanes${mission.requiredPlanes}`}
                                            sx={{ color: 'white' }}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton
                                                edge="end"
                                                aria-label="delete"
                                                onClick={() => deleteMission(mission._id)}
                                                sx={{ color: 'red' }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton
                                                edge="end"
                                                aria-label="send"
                                                onClick={() => sendMission(mission._id)}
                                                sx={{ color: 'green' }}
                                            >
                                                <SendIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                   </ListItem>
                                    <Divider />
                                </React.Fragment>
                            ))}
                        </List>
                    )}
                </Box>

                {/* אזור מרכזי */}
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 2,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        borderRadius: 2,
                        marginLeft: 2,
                    }}
                >
                    <Typography variant="h5" sx={{ color: 'white' }}>
                        ברוך הבא, מפקד!
                    </Typography>
                </Box>
            </Box>

            {/* כפתור יצירת חייל חדש */}
            <Button
                variant="contained"
                startIcon={<AddCircleIcon />}
                onClick={handleCreateSoldier}
                sx={{
                    marginTop: 3,
                    backgroundColor: '#1976d2',
                    '&:hover': {
                        backgroundColor: '#115293',
                    },
                }}
            >
                יצירת חייל חדש
            </Button>
        </Box>
    );
};

export default Commander;
