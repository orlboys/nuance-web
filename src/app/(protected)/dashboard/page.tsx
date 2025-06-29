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
  Stack,
  Skeleton,
  Theme,
} from "@mui/material";
import SplitText from "@/components/ui/SplitText";
import EditIcon from "@mui/icons-material/Edit";
import ProfileEditModal from "@/components/dashboard/ProfileEditModal";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

import { UserProfile } from "@/types/UserProfile";

type Response = {
  id: number;
  text: string;
  time: Date;
  biasScore: number;
  label: string;
};

// Skeleton Components
const ProfileSkeleton = ({ theme }: { theme: Theme }) => (
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
      <Skeleton variant="text" width={80} height={32} />
      <Skeleton
        variant="rectangular"
        width={60}
        height={32}
        sx={{ borderRadius: 1 }}
      />
    </Box>

    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mb: 3,
      }}
    >
      <Skeleton variant="circular" width={100} height={100} sx={{ mb: 2 }} />
      <Skeleton variant="text" width={120} height={28} sx={{ mb: 1 }} />
      <Skeleton variant="text" width={180} height={20} />
    </Box>

    <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
    <Skeleton variant="text" width="80%" height={20} sx={{ mb: 1 }} />
    <Skeleton variant="text" width="90%" height={20} />
  </Paper>
);

const AnalysisCardSkeleton = ({ theme }: { theme: Theme }) => (
  <Card sx={{ mb: 2, background: theme.palette.background.paper }}>
    <CardContent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Skeleton variant="text" width={120} height={20} />
        <Skeleton
          variant="rectangular"
          width={120}
          height={24}
          sx={{ borderRadius: 12 }}
        />
      </Box>
      <Stack justifyContent="space-between" direction="row">
        <Box sx={{ flex: 1, mr: 2 }}>
          <Skeleton variant="text" width="100%" height={24} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="70%" height={24} />
        </Box>
        <Box>
          <Skeleton
            variant="rectangular"
            width={80}
            height={36}
            sx={{ mx: 2, mt: 2, borderRadius: 1 }}
          />
          <Skeleton
            variant="rectangular"
            width={80}
            height={36}
            sx={{ mt: 2, borderRadius: 1 }}
          />
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

const PreviousAnalysesSkeleton = ({ theme }: { theme: Theme }) => (
  <Box sx={{ flex: 1 }}>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 3,
        justifyContent: "space-between",
      }}
    >
      <Skeleton variant="text" width={180} height={32} />
      <Skeleton
        variant="rectangular"
        width={120}
        height={36}
        sx={{ borderRadius: 1 }}
      />
    </Box>

    <List disablePadding>
      {[...Array(3)].map((_, index) => (
        <AnalysisCardSkeleton key={index} theme={theme} />
      ))}
    </List>
  </Box>
);

export default function HomePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [responses, setResponses] = useState<Response[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const theme = useTheme();

  // Move handlePreviousAnalysisSubmit outside useEffect so it can be used in JSX
  function handlePreviousAnalysisSubmit(response: Response) {
    const params = new URLSearchParams({ id: response.id.toString() });
    router.push("/analyze?" + params.toString());
  }

  async function handlePreviousAnalysisDelete(response: Response) {
    const id = response.id;
    try {
      const { error } = await supabase.from("requests").delete().eq("id", id);
      if (error) {
        console.error("Failed to delete analysis:", error.message);
        alert("Failed to delete analysis. Please try again.");
      } else {
        // Remove the deleted response from the UI
        setResponses((prev) => (prev ? prev.filter((r) => r.id !== id) : null));
      }
    } catch (err) {
      console.error("Unexpected error while deleting analysis:", err);
      alert("An unexpected error occurred. Please try again.");
    }
  }

  function determineLabel(value: number) {
    if (value < 10) return "Far Left";
    if (value < 35) return "Left";
    if (value < 45) return "Slightly Left";
    if (value <= 55) return "Neutral";
    if (value <= 65) return "Slightly Right";
    if (value <= 90) return "Right";
    return "Far Right";
  }

  useEffect(() => {
    async function fetchUserInfo() {
      // Get the user info based off the current session's user id.
      setLoading(true); // required to ensure user info is fetched before being checked.
      const { data: authData } = await supabase.auth.getUser();
      const userId = authData.user?.id;
      if (!userId) {
        setUser(null);
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();
      if (error || !data) {
        setUser(null);
      } else {
        setUser({
          username: data.username,
          email: data.email,
          bio: data.bio,
          avatar_url: data.avatar_url,
        });
      }
      setLoading(false);
    }

    async function fetchPreviousAnalysis() {
      const { data, error } = await supabase
        .from("requests")
        .select("*")
        .eq("user_id", (await supabase.auth.getUser()).data.user?.id)
        .order("created_at", { ascending: false });

      if (error || !data) {
        setResponses(null);
      } else {
        // Mapping the fetched data from supabase into an array of responses
        const mapped: Response[] = data.map((item) => ({
          id: item.id,
          text: item.input_text,
          time: new Date(item.created_at),
          biasScore: item.bias_value,
          label: determineLabel(item.bias_value),
        }));
        setResponses(mapped);
      }
    }
    fetchUserInfo();
    fetchPreviousAnalysis();
  }, [router, theme]);

  useEffect(() => {
    if (!loading && user === null) {
      router.push("/login");
    }
  }, [loading, user, router]);

  const handleProfileUpdate = (updatedProfile: UserProfile) => {
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

  const getBiasColor = (label: string) => {
    if (label) {
      switch (label.toLowerCase()) {
        case "far left":
          return theme.palette.info.dark;
        case "left":
          return theme.palette.info.main;
        case "slightly left":
          return theme.palette.info.light;
        case "neutral":
          return theme.palette.success.main;
        case "slightly right":
          return theme.palette.warning.light;
        case "right":
          return theme.palette.warning.main;
        case "far right":
          return theme.palette.error.main;
        default:
          return "default";
      }
    }
    return "default";
  };

  // Show loading skeleton while user data is being fetched
  if (loading) {
    return (
      <Container
        maxWidth="lg"
        sx={{ py: 4, background: theme.palette.background.default }}
      >
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Skeleton
            variant="text"
            width={200}
            height={40}
            sx={{ mx: "auto" }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
          }}
        >
          <ProfileSkeleton theme={theme} />
          <PreviousAnalysesSkeleton theme={theme} />
        </Box>
      </Container>
    );
  }
  if (user == null) {
    return null;
  }
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
          text={`Hello, ${user.username}!`}
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
              src={user.avatar_url}
              alt={user.username}
              sx={{
                width: 100,
                height: 100,
                mb: 2,
                bgcolor: theme.palette.primary.light,
              }}
            />
            <Typography variant="h6" component="h2">
              {user.username}
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

          {responses && responses.length > 0 ? (
            <List disablePadding>
              {responses.map((response) => (
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
                        {formatDate(response.time)}
                      </Typography>
                      <Chip
                        label={`${response.label} (${response.biasScore.toFixed(
                          2
                        )}%)`}
                        size="small"
                        variant="outlined"
                        sx={{
                          borderColor: theme.palette.divider,
                          bgcolor: getBiasColor(response.label),
                          minWidth: "20%",
                        }}
                      />
                    </Box>
                    <Stack justifyContent="space-between" direction="row">
                      <Typography variant="body1" maxWidth={"60%"}>
                        {response.text.length > 60
                          ? response.text.slice(0, 53) + "..."
                          : response.text}
                      </Typography>
                      <Box>
                        <Button
                          variant="outlined"
                          color="warning"
                          sx={{ mx: 2, mt: 2, width: 50 }}
                          onClick={() => handlePreviousAnalysisDelete(response)}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="outlined"
                          sx={{ mt: 2, width: 50 }}
                          onClick={() => handlePreviousAnalysisSubmit(response)}
                        >
                          Open
                        </Button>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
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
