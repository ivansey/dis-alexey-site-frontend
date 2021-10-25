import React from "react";
import {withRouter} from "react-router-dom";
import {Container, Grid, Card, CardContent, Typography} from "@mui/material";

function Reviews(props) {
    const content = [
        {
            name: "Ирина",
            text: "Спасибо огромное Алексею! Я была удивлена результатом, по полу тараканы валялись, как семечки. При этом отравой потом не воняло. Рекомендую.",
        },
        {
            name: "Иван",
            text: "У меня дома была проблема с клопами. Но после обработки они перестали мучать мою семью. Спасибо Алексею за эту обработку."
        }
    ];

    return <Container>
        <Grid container spacing={2} justifyContent="center">
            {
                content.map((d, i) => {
                    return <Grid item xs={12} lg={4} key={i}>
                        <Card>
                            <CardContent>
                                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                    {d.name}
                                </Typography>
                                <Typography variant="body2">
                                    {d.text}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                })
            }

        </Grid>
    </Container>
}

export default withRouter(Reviews)