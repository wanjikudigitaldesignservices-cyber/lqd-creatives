import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUserRole } from "@/app/actions/auth-actions";

export async function GET() {
  const { isAdmin } = await getCurrentUserRole();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized. Admin privileges required." }, { status: 403 });
  }

  const supabase = await createClient();
  const { data: leads, error } = await supabase
    .from("lqd_leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !leads) {
    return NextResponse.json({ error: "Failed to fetch leads." }, { status: 500 });
  }

  // Generate CSV
  const headers = [
    "ID",
    "Date",
    "Name",
    "Business Name",
    "Email",
    "Phone",
    "Service Required",
    "Budget Range",
    "Timeline",
    "Status",
    "Internal Notes",
    "Message",
    "Source",
    "UTM Source",
  ];

  const escapeCSV = (value: string | null | undefined) => {
    if (value === null || value === undefined) return '""';
    const str = String(value).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = leads.map((lead) => [
    escapeCSV(lead.id),
    escapeCSV(new Date(lead.created_at).toISOString()),
    escapeCSV(lead.name),
    escapeCSV(lead.business_name),
    escapeCSV(lead.email),
    escapeCSV(lead.phone),
    escapeCSV(lead.service_required),
    escapeCSV(lead.budget_range),
    escapeCSV(lead.desired_timeline),
    escapeCSV(lead.status),
    escapeCSV(lead.internal_notes),
    escapeCSV(lead.message),
    escapeCSV(lead.source),
    escapeCSV(lead.utm_source),
  ]);

  const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");

  const filename = `lqd_creatives_leads_${new Date().toISOString().split("T")[0]}.csv`;

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
