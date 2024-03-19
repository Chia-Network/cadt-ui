import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';

interface TerminalComponentProps {
  log: string;
}

const XTerm: React.FC<TerminalComponentProps> = ({ log }) => {
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const terminal = useRef<Terminal | null>(null);

  useEffect(() => {
    terminal.current = new Terminal();
    if (terminalRef.current) {
      terminal.current.open(terminalRef.current);
    }

    return () => {
      terminal.current?.dispose();
    };
  }, []);

  useEffect(() => {
    terminal.current?.writeln(log);
  }, [log]);

  return (
    <div
      ref={terminalRef}
      style={{
        width: '100%',
        textAlign: 'left',
      }}
    />
  );
};

export { XTerm };
