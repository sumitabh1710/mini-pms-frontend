import React from "react";
import { useQuery } from "@apollo/client";
import { Typography, Box } from "@mui/material";
import { TaskComment as Comment } from "../graphql/types"; // Assuming Comment type is defined in types
import { GET_TASK_COMMENTS } from "../graphql/queries";

interface Props {
  taskId: number;
}

const TaskComment: React.FC<Props> = ({ taskId }) => {
  const { data, loading, error } = useQuery<{ commentsByTask: Comment[] }>(GET_TASK_COMMENTS, {
    variables: { taskId },
    skip: !taskId,
  });

  if (loading) return <Typography>Loading comments...</Typography>;
  if (error) return <Typography>Error loading comments</Typography>;

  return (
    <Box mt={2}>
      <Typography variant="h6">Comments</Typography>
      {data?.commentsByTask?.map((comment) => (
        <Box key={comment.id} p={1} borderBottom="1px solid #ccc">
          <Typography variant="body2">{comment.content}</Typography>
          <Typography variant="caption">By: {comment.authorEmail}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default TaskComment;
