"use client";

import { useState } from "react";
import { LqdLead, LeadStatus } from "@/lib/types/database";
import { updateLeadStatusAction, deleteLeadAction } from "@/app/actions/cms-actions";
import { formatDate } from "@/lib/utils";
import { 
  Search, 
  Download, 
  Trash2, 
  Clock, 
  MessageSquare, 
  CheckCircle, 
  X, 
  Calendar, 
  User, 
  FileText,
  Loader2,
  ExternalLink
} from "lucide-react";

interface LeadInboxClientProps {
  initialLeads: LqdLead[];
  isAdmin: boolean;
}

const ALL_STATUSES: LeadStatus[] = [
  "New",
  "Contacted",
  "Qualified",
  "Consultation",
  "Proposal Sent",
  "Won",
  "Lost",
];

export function LeadInboxClient({ initialLeads, isAdmin }: LeadInboxClientProps) {
  const [leads, setLeads] = useState<LqdLead[]>(initialLeads);
  const [selectedLead, setSelectedLead] = useState<LqdLead | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Drawer edit state
  const [currentStatus, setCurrentStatus] = useState<LeadStatus>("New");
  const [notes, setNotes] = useState<string>("");
  const [followUpDate, setFollowUpDate] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // Filter leads
  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = statusFilter === "All" || lead.status === statusFilter;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !query ||
      lead.name.toLowerCase().includes(query) ||
      (lead.business_name && lead.business_name.toLowerCase().includes(query)) ||
      (lead.email && lead.email.toLowerCase().includes(query)) ||
      (lead.phone && lead.phone.includes(query)) ||
      lead.service_required.toLowerCase().includes(query);

    return matchesStatus && matchesSearch;
  });

  const openLeadDrawer = (lead: LqdLead) => {
    setSelectedLead(lead);
    setCurrentStatus(lead.status);
    setNotes(lead.internal_notes || "");
    setFollowUpDate(lead.next_follow_up || "");
    setActionMessage(null);
  };

  const handleStatusUpdate = async (newStatus: LeadStatus) => {
    if (!selectedLead) return;
    setSaving(true);
    setActionMessage(null);

    const res = await updateLeadStatusAction({
      lead_id: selectedLead.id,
      status: newStatus,
      internal_notes: notes,
      next_follow_up: followUpDate || null,
    });

    setSaving(false);
    if (res.success) {
      setCurrentStatus(newStatus);
      setActionMessage(`Updated status to ${newStatus}`);
      // Update local state
      setLeads((prev) =>
        prev.map((l) =>
          l.id === selectedLead.id
            ? { ...l, status: newStatus, internal_notes: notes, next_follow_up: followUpDate || null }
            : l
        )
      );
    } else {
      setActionMessage(res.message);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedLead) return;
    setSaving(true);
    setActionMessage(null);

    const res = await updateLeadStatusAction({
      lead_id: selectedLead.id,
      status: currentStatus,
      internal_notes: notes,
      next_follow_up: followUpDate || null,
    });

    setSaving(false);
    if (res.success) {
      setActionMessage("Notes & follow-up date saved successfully.");
      setLeads((prev) =>
        prev.map((l) =>
          l.id === selectedLead.id
            ? { ...l, internal_notes: notes, next_follow_up: followUpDate || null }
            : l
        )
      );
    } else {
      setActionMessage(res.message);
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    if (!confirm("Are you sure you want to permanently delete this lead record?")) return;
    const res = await deleteLeadAction(leadId);
    if (res.success) {
      setLeads((prev) => prev.filter((l) => l.id !== leadId));
      if (selectedLead?.id === leadId) {
        setSelectedLead(null);
      }
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads by name, email, phone, or service..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#0e1833] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        {/* CSV Export for Admins */}
        {isAdmin && (
          <a
            href="/api/admin/leads/export"
            download
            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-200 text-xs font-semibold hover:bg-white/10 flex items-center gap-1.5 self-start md:self-auto"
          >
            <Download className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Export CSV</span>
          </a>
        )}
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setStatusFilter("All")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
            statusFilter === "All"
              ? "bg-[#d4af37] text-[#080e1e]"
              : "bg-[#0e1833] text-slate-400 hover:text-white"
          }`}
        >
          All ({leads.length})
        </button>
        {ALL_STATUSES.map((st) => {
          const count = leads.filter((l) => l.status === st).length;
          return (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                statusFilter === st
                  ? "bg-[#d4af37] text-[#080e1e]"
                  : "bg-[#0e1833] text-slate-400 hover:text-white"
              }`}
            >
              <span>{st}</span>
              <span className="text-[10px] opacity-75">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Leads Table */}
      <div className="p-6 rounded-2xl bg-[#0e1833] border border-white/10">
        {filteredLeads.length === 0 ? (
          <div className="py-16 text-center text-xs text-slate-500">
            No leads match your filter criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-slate-400 uppercase tracking-wider border-b border-white/5">
                <tr>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Contact</th>
                  <th className="py-3 px-3">Service Required</th>
                  <th className="py-3 px-3">Timeline / Budget</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => openLeadDrawer(lead)}
                    className="hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <td className="py-3.5 px-3 text-slate-400 whitespace-nowrap">
                      {formatDate(lead.created_at)}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="font-semibold text-white block">{lead.name}</span>
                      <span className="text-[11px] text-slate-400 block">
                        {lead.business_name ? `${lead.business_name} • ` : ""}
                        {lead.phone || lead.email}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-slate-300 font-medium max-w-[200px] truncate">
                      {lead.service_required}
                    </td>
                    <td className="py-3.5 px-3 text-slate-400">
                      <span>{lead.desired_timeline || "Standard"}</span>
                      {lead.budget_range && (
                        <span className="block text-[10px] text-slate-500">
                          {lead.budget_range}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          lead.status === "New"
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                            : lead.status === "Contacted"
                            ? "bg-blue-500/15 text-blue-400 border border-blue-500/30"
                            : lead.status === "Qualified"
                            ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                            : lead.status === "Won"
                            ? "bg-green-500/15 text-green-400 border border-green-500/30"
                            : "bg-slate-500/15 text-slate-400 border border-slate-500/30"
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openLeadDrawer(lead);
                        }}
                        className="text-xs font-semibold text-[#d4af37] hover:underline"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Lead Detail Drawer / Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-end">
          <div className="w-full max-w-xl h-full bg-[#0a1226] border-l border-white/10 p-6 sm:p-8 overflow-y-auto space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#d4af37]">
                    Lead Enquiry Detail
                  </span>
                  <h3 className="text-xl font-bold text-white">{selectedLead.name}</h3>
                  {selectedLead.business_name && (
                    <p className="text-xs text-slate-400">{selectedLead.business_name}</p>
                  )}
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {actionMessage && (
                <div className="p-3 rounded-lg bg-[#132448] border border-[#d4af37]/30 text-xs text-slate-200">
                  {actionMessage}
                </div>
              )}

              {/* Status Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Lead Pipeline Stage:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {ALL_STATUSES.map((st) => (
                    <button
                      key={st}
                      disabled={saving}
                      onClick={() => handleStatusUpdate(st)}
                      className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                        currentStatus === st
                          ? "bg-[#d4af37] text-[#080e1e]"
                          : "bg-[#0e1833] border border-white/10 text-slate-300 hover:bg-white/5"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Full Message Box */}
              <div className="p-4 rounded-xl bg-[#080e1e] border border-white/10 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Submitted Project Message:
                </span>
                <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {selectedLead.message}
                </p>
              </div>

              {/* Details Key-Value List */}
              <div className="grid grid-cols-2 gap-4 text-xs bg-[#0e1833] p-4 rounded-xl border border-white/5">
                <div>
                  <span className="text-slate-400 block">Phone / WhatsApp</span>
                  {selectedLead.phone ? (
                    <a
                      href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#25d366] font-semibold hover:underline flex items-center gap-1 mt-0.5"
                    >
                      <span>{selectedLead.phone}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-slate-500">None</span>
                  )}
                </div>

                <div>
                  <span className="text-slate-400 block">Email Address</span>
                  {selectedLead.email ? (
                    <a
                      href={`mailto:${selectedLead.email}`}
                      className="text-white hover:underline mt-0.5 block truncate"
                    >
                      {selectedLead.email}
                    </a>
                  ) : (
                    <span className="text-slate-500">None</span>
                  )}
                </div>

                <div>
                  <span className="text-slate-400 block">Service Selected</span>
                  <span className="text-white font-medium">{selectedLead.service_required}</span>
                </div>

                <div>
                  <span className="text-slate-400 block">Estimated Budget</span>
                  <span className="text-white font-medium">{selectedLead.budget_range || "N/A"}</span>
                </div>

                <div>
                  <span className="text-slate-400 block">Desired Timeline</span>
                  <span className="text-white font-medium">{selectedLead.desired_timeline || "Standard"}</span>
                </div>

                <div>
                  <span className="text-slate-400 block">Submission Date</span>
                  <span className="text-slate-300">{formatDate(selectedLead.created_at)}</span>
                </div>
              </div>

              {/* Internal Notes & Follow-up Planner */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Internal Follow-up Notes:
                  </label>
                  <div className="flex items-center gap-2">
                    <label className="text-[10px] text-slate-400">Next Follow-Up:</label>
                    <input
                      type="date"
                      value={followUpDate}
                      onChange={(e) => setFollowUpDate(e.target.value)}
                      className="px-2 py-1 rounded bg-[#080e1e] border border-white/10 text-white text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <textarea
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Record call summary, quotation milestones, client requirements, or scheduled consultations..."
                  className="w-full px-3 py-2.5 rounded-lg bg-[#080e1e] border border-white/10 text-white text-xs focus:outline-none focus:border-[#d4af37]"
                />

                <button
                  onClick={handleSaveNotes}
                  disabled={saving}
                  className="px-4 py-2 rounded-lg bg-[#d4af37] text-[#080e1e] font-bold text-xs hover:bg-[#e6c86e] transition-colors flex items-center gap-1.5"
                >
                  {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                  <span>Save Notes & Planner</span>
                </button>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              {isAdmin && (
                <button
                  onClick={() => handleDeleteLead(selectedLead.id)}
                  className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Record</span>
                </button>
              )}
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 rounded-lg border border-white/20 text-slate-300 text-xs hover:bg-white/5 ml-auto"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
