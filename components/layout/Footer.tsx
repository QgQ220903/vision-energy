export default function Footer() {
  return (
    <footer className="py-8 text-center flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <div className="h-[1px] w-8 bg-border" />
        <span className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.4em]">
          Vision Energy
        </span>
        <div className="h-[1px] w-8 bg-border" />
      </div>
      <p className="text-[8px] font-bold text-muted-foreground/50 uppercase tracking-widest">
        © 2024 Energy Station System. All rights reserved.
      </p>
    </footer>
  );
}