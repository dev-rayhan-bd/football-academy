"use client";

import React from "react";
import { 
  IconUsers, 
  IconCurrencyDollar,
  IconClock,
  IconCreditCard,
  IconCalendarFilled,
  IconPhone,
  IconMail
} from "@tabler/icons-react";

import { DashboardHero } from "@/components/dashboard/dashboard-hero";
import { DashboardStatCard } from "@/components/dashboard/dashboard-stat-card";
import { DashboardSidebarPanel, DashboardSidebarItem } from "@/components/dashboard/dashboard-sidebar";
import { SuperAdminDashboard } from "@/components/user-wise-dashboard/super-admin-dashboard/dashboard";

const AdminDashboard = () => {
  return (
    <SuperAdminDashboard />
  );
};

export default AdminDashboard;
