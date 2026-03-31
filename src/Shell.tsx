/**
 * Shell — Mobile-responsive app layout.
 *
 * USAGE (in App.tsx or your router):
 * <Shell sidebar={<MySidebarContent />}>
 * <Page>...</Page>
 * </Shell>
 *
 * The sidebar is hidden on mobile and toggled by the built-in hamburger button.
 * Customize sidebar width, colors, and nav items — but keep this structure.
 */
import React from 'react'
// Import @blinkdotnew/ui dihapus karena tidak tersedia di lokal

interface ShellProps {
  /** Sidebar content — e.g. <Sidebar><SidebarItem .../></Sidebar> */
  sidebar: React.ReactNode
  /** App name shown in mobile header */
  appName?: string
  children: React.ReactNode
}

export function Shell({ sidebar, appName = 'App', children }: ShellProps) {
  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      {/* Sidebar — hidden on mobile, always visible on md+ */}
      <aside className="hidden w-64 shrink-0 border-r border-border md:block">
        {sidebar}
      </aside>

      {/* Main content */}
      <main className="flex flex-1 flex-col">
        {/* Mobile header — hamburger + app name, only shown below md breakpoint */}
        <div className="md:hidden flex items-center gap-3 px-4 h-14 border-b border-border bg-background sticky top-0 z-30">
          <button type="button" aria-label="Toggle Menu" className="flex h-8 w-8 items-center justify-center rounded-md border border-border">
            ☰
          </button>
          <span className="font-semibold text-sm">{appName}</span>
        </div>

        {/* Page content */}
        {children}
      </main>
    </div>
  )
}