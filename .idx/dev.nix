{ pkgs, ... }: {

  # NOTE: This is an excerpt of a complete Nix configuration example.
  # For more information about the dev.nix file in IDX, see
  # https://developers.google.com/idx/guides/customize-idx-env

  channel = "stable-23.11";
  packages = [
    pkgs.systemd
    pkgs.sudo
  ];

  services.docker.enable= true;

  # Enable previews and customize configuration
  idx.previews = {
    enable = true;
    previews = [
      # The following object sets web previews
      {
        command = [
          "npm"
          "run"
          "start"
        ];
        id = "web";
        manager = "web";
      }
    ];
  };
}
