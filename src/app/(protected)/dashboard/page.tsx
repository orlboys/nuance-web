"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Paper,
  Avatar,
  Button,
  List,
  Card,
  CardContent,
  Chip,
  useTheme,
} from "@mui/material";
import SplitText from "@/components/ui/SplitText";
import EditIcon from "@mui/icons-material/Edit";
import ProfileEditModal from "@/components/dashboard/ProfileEditModal";
import { useRouter } from "next/navigation";

// Mock user data - in a real app, this would come from your authentication system
const mockUser = {
  id: "1",
  name: "Jane Doe",
  email: "jane.doe@example.com",
  avatar: "/placeholder.svg?height=100&width=100",
  bio: "Interested in unbiased political analysis and ethical AI applications.",
};

// Mock previous responses
const mockResponses = [
  {
    id: "1",
    text: 'The statement "All politicians are corrupt" shows clear negative bias and overgeneralization.',
    date: "2023-06-10T14:30:00Z",
    biasScore: 0.78,
    biasType: "Negative",
  },
  {
    id: "2",
    text: "The economic policy proposed by the current administration aims to reduce inflation through controlled spending.",
    date: "2023-06-08T09:15:00Z",
    biasScore: 0.12,
    biasType: "Neutral",
  },
  {
    id: "3",
    text: "Progressive tax policies always lead to greater economic equality and prosperity for all citizens.",
    date: "2023-06-05T16:45:00Z",
    biasScore: 0.65,
    biasType: "Positive",
  },
];

type updatedProfile = {
  name: string;
  email: string;
  bio: string;
  avatar: string;
};

export default function HomePage() {
  const [user, setUser] = useState(mockUser);
  // eslint-disable-next-line
  const [responses, setResponses] = useState(mockResponses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const theme = useTheme();

  // In a real app, you would fetch the user data and responses from your API
  useEffect(() => {
    // Fetch user data
    // Fetch previous responses
  }, []);

  const handleProfileUpdate = (updatedProfile: updatedProfile) => {
    setUser({ ...user, ...updatedProfile });
    setIsModalOpen(false);
  };

  const formatDate = (dateString: string | Date) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getBiasColor = (biasType: string) => {
    switch (biasType.toLowerCase()) {
      case "negative":
        return "error";
      case "positive":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ py: 4, background: theme.palette.background.default }}
    >
      <Typography
        variant="h4"
        component="h1"
        align="center"
        sx={{ fontWeight: "bold", mb: 3 }}
      >
        <SplitText
          text={`Hello, ${user.name}!`}
          className="text-2xl font-semibold text-center"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
        />
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        {/* User Profile Section */}
        <Paper
          elevation={2}
          sx={{
            p: 3,
            flex: { xs: "1", md: "0 0 300px" },
            height: "fit-content",
            background: theme.palette.background.paper,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 2,
            }}
          >
            <Typography variant="h5" component="h1">
              Profile
            </Typography>
            <Button
              startIcon={<EditIcon />}
              onClick={() => setIsModalOpen(true)}
              size="small"
              sx={{
                color: theme.palette.primary.main,
              }}
            >
              Edit
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Avatar
              src={user.avatar}
              alt={user.name}
              sx={{
                width: 100,
                height: 100,
                mb: 2,
                bgcolor: theme.palette.primary.light,
              }}
            />
            <Typography variant="h6" component="h2">
              {user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
          </Box>

          <Typography variant="body1" paragraph>
            {user.bio}
          </Typography>
        </Paper>

        {/* Previous Responses Section */}
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 3,
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5" component="h1">
              Previous Analyses
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push("/analyze")}
              sx={{ ml: 2 }}
            >
              New Analysis
            </Button>
          </Box>

          {responses.length > 0 ? (
            <List disablePadding>
              {
                //eslint-disable-next-line
                responses.map((response, index) => (
                  <Card
                    key={response.id}
                    sx={{ mb: 2, background: theme.palette.background.paper }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 1,
                        }}
                      >
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(response.date)}
                        </Typography>
                        <Chip
                          label={`${response.biasType} (${(
                            response.biasScore * 100
                          ).toFixed(0)}%)`}
                          size="small"
                          color={getBiasColor(response.biasType)}
                          variant="outlined"
                          sx={{
                            borderColor: theme.palette.divider,
                          }}
                        />
                      </Box>
                      <Typography variant="body1">{response.text}</Typography>
                    </CardContent>
                  </Card>
                ))
              }
            </List>
          ) : (
            <Paper
              sx={{
                p: 3,
                textAlign: "center",
                background: theme.palette.background.paper,
              }}
            >
              <Typography variant="body1" color="text.secondary">
                You haven&apos;t analyzed any text yet.
              </Typography>
              <Button
                variant="contained"
                onClick={() => router.push("/analyze")}
                sx={{ mt: 2, background: theme.palette.primary.main }}
              >
                Analyze Your First Text
              </Button>
            </Paper>
          )}
        </Box>
      </Box>

      {/* Profile Edit Modal */}
      <ProfileEditModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={user}
        onSave={handleProfileUpdate}
      />
    </Container>
  );
}
