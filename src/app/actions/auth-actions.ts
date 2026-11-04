"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { LqdProfile } from "@/lib/types/database";

export interface AuthActionResult {
  success: boolean;
  message: string;
}

export async function getCurrentUserRole(): Promise<{
  user: { id: string; email: string } | null;
  profile: LqdProfile | null;
  isAdmin: boolean;
  isStaff: boolean;
}> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { user: null, profile: null, isAdmin: false, isStaff: false };
    }

    const { data: profile } = await supabase
      .from("lqd_profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    const isAdmin = profile?.role === "admin";
    const isStaff = profile?.role === "admin" || profile?.role === "editor";

    return {
      user: { id: user.id, email: user.email || "" },
      profile: profile as LqdProfile | null,
      isAdmin,
      isStaff,
    };
  } catch (err: unknown) {
    if ((err as { digest?: string })?.digest === "DYNAMIC_SERVER_USAGE") {
      throw err;
    }
    console.error("[Get Current User Error]:", err);
    return { user: null, profile: null, isAdmin: false, isStaff: false };
  }
}

export async function loginAction(formData: FormData): Promise<AuthActionResult> {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return { success: false, message: "Please provide both email and password." };
  }

  const supabase = await createClient();
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (signInError || !signInData.user) {
    return {
      success: false,
      message: signInError?.message || "Invalid email or password.",
    };
  }

  // Check if user has an authorized profile in lqd_profiles
  const { data: profile } = await supabase
    .from("lqd_profiles")
    .select("role")
    .eq("id", signInData.user.id)
    .single();

  if (!profile || (profile.role !== "admin" && profile.role !== "editor")) {
    // If user is not yet in lqd_profiles, check if they are the admin email
    if (email.toLowerCase() === "lqdcreatives@gmail.com" || email.toLowerCase() === "cavemen.executive.nairobi@gmail.com") {
      // Auto-attach as admin
      const adminClient = createAdminClient();
      await adminClient.from("lqd_profiles").upsert({
        id: signInData.user.id,
        email: signInData.user.email,
        full_name: "Reuben Wanjiku Kimani",
        role: "admin",
      });
    } else {
      await supabase.auth.signOut();
      return {
        success: false,
        message: "Your account is not authorized to access the LQD Creatives CMS dashboard.",
      };
    }
  }

  revalidatePath("/admin");
  return { success: true, message: "Login successful. Redirecting..." };
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/");
  redirect("/admin/login");
}

export async function setupFirstAdminAction(formData: FormData): Promise<AuthActionResult> {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();
  const fullName = formData.get("full_name")?.toString().trim() || "Administrator";
  const setupSecret = formData.get("setup_secret")?.toString().trim();

  const requiredSecret = process.env.ADMIN_SETUP_SECRET || "lqd_admin_setup_2026_secure";

  if (setupSecret !== requiredSecret) {
    return {
      success: false,
      message: "Invalid setup authorization token. Public registration is permanently closed.",
    };
  }

  if (!email || !password || password.length < 8) {
    return {
      success: false,
      message: "Please provide a valid email and a strong password (minimum 8 characters).",
    };
  }

  const supabase = await createClient();
  const adminClient = createAdminClient();

  // Try admin API if service role key exists
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const { data: newUser, error: createError } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: fullName },
    });

    if (createError && !createError.message.includes("already registered")) {
      return { success: false, message: createError.message };
    }

    if (newUser?.user) {
      await adminClient.from("lqd_profiles").upsert({
        id: newUser.user.id,
        email,
        full_name: fullName,
        role: "admin",
      });
      return {
        success: true,
        message: "Primary administrator account created successfully! You may now log in.",
      };
    }
  }

  // Fallback to standard signUp
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
    },
  });

  if (signUpError) {
    return { success: false, message: signUpError.message };
  }

  if (signUpData.user) {
    await supabase.from("lqd_profiles").upsert({
      id: signUpData.user.id,
      email,
      full_name: fullName,
      role: "admin",
    });
  }

  return {
    success: true,
    message: "Primary administrator account registered successfully! You may now sign in.",
  };
}

export async function updatePasswordAction(newPassword: string): Promise<AuthActionResult> {
  if (!newPassword || newPassword.length < 8) {
    return {
      success: false,
      message: "Password must be at least 8 characters long.",
    };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      return { success: false, message: error.message };
    }

    return {
      success: true,
      message: "Password changed successfully! Keep your new password safe.",
    };
  } catch (err: unknown) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Failed to update password",
    };
  }
}
