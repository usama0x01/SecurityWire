import React from "react";
import AddIcon from "@mui/icons-material/Add";
import ViewAgendaIcon from "@mui/icons-material/ViewAgenda";
import MergeTypeIcon from "@mui/icons-material/MergeType";
import ForumIcon from "@mui/icons-material/Forum";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PublishIcon from "@mui/icons-material/Publish";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import ApprovalIcon from "@mui/icons-material/Approval";
import EnhancedEncryptionIcon from "@mui/icons-material/EnhancedEncryption";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import LoginIcon from "@mui/icons-material/Login";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import GppGoodIcon from "@mui/icons-material/GppGood";
export default [
  {
    role: "no-auth",
    title: "WELCOME TO SECURITY WIRE",
    actions: [
      {
        label: "Login",
        route: "/login",
        icon: <LoginIcon />,
      },
      {
        label: "Register",
        route: "/register",
        icon: <LockOpenIcon />,
      },
    ],
  },
  {
    role: "customer",
    title: "Customer Dashboard",
    actions: [
      {
        label: "View Created Programs",
        route: "/customer/createdPrograms",
        icon: <ViewAgendaIcon />,
      },
      {
        label: "Create new Program",
        route: "/customer/createProgram",
        icon: <AddIcon />,
      },
      {
        label: "Automated Scanner",
        route: "/customer/autoscan",
        icon: <GppGoodIcon />,
      },
    ],
  },
  {
    role: "security-researcher",
    title: "Security Researcher Dashboard",
    actions: [
      {
        label: "Enrolled Programs",
        route: "/researcher/enrolled",
        icon: <MergeTypeIcon />,
      },
      {
        label: "Invitations",
        route: "/researcher/invitations",
        icon: <ForumIcon />,
      },
      {
        label: "View Public Programs",
        route: "/researcher/publicPrograms",
        icon: <PeopleAltIcon />,
      },
      {
        label: "View Submissions",
        route: "/researcher/submissions",
        icon: <PublishIcon />,
      },
    ],
  },
  {
    role: "admin",
    title: "Admin Dashboard",
    actions: [
      {
        label: "Programs for Approval",
        route: "/admin/programApproval",
        icon: <LoyaltyIcon />,
      },
      {
        label: "Submissions for Approval",
        route: "/admin/submissionApproval",
        icon: <ApprovalIcon />,
      },
      {
        label: "Researchers",
        route: "/admin/researchers",
        icon: <EnhancedEncryptionIcon />,
      },
      {
        label: "Customers",
        route: "/admin/customers",
        icon: <EmojiPeopleIcon />,
      },
    ],
  },
];
